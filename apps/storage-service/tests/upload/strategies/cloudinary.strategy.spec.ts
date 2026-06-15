import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Writable } from 'stream';

// Capture what gets piped into upload_stream so we can assert the strategy
// streams the temp file's content instead of buffering it.
const uploadStreamMock = jest.fn();

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: (...args: any[]) => uploadStreamMock(...args),
    },
    api: {},
  },
}));

import { CloudinaryStorageStrategy } from '../../../src/modules/upload/strategies/cloudinary.strategy';

function makeStrategy() {
  const config = {
    get: jest.fn((key: string) => {
      if (key === 'storage.cloudinary') {
        return { cloudName: 'demo', apiKey: 'k', apiSecret: 's' };
      }
      return undefined;
    }),
  };
  const i18n = { t: jest.fn((key: string) => key) };
  return new CloudinaryStorageStrategy(config as any, i18n as any);
}

// A Writable that collects everything written, then invokes the cloudinary
// callback with a fake successful response once the source finishes.
function makeCollectingUploadStream(callback: (err: any, res: any) => void) {
  const chunks: Buffer[] = [];
  const w = new Writable({
    write(chunk, _enc, cb) {
      chunks.push(Buffer.from(chunk));
      cb();
    },
  });
  w.on('finish', () => {
    (w as any).__collected = Buffer.concat(chunks);
    callback(null, {
      public_id: 'pid-123',
      secure_url: 'https://res.cloudinary.com/demo/raw/upload/pid-123',
    });
  });
  return w;
}

describe('CloudinaryStorageStrategy.upload — streams from temp path', () => {
  let srcDir: string;
  const srcFiles: string[] = [];

  function diskFile(content: string, originalname: string) {
    const buf = Buffer.from(content);
    const p = path.join(srcDir, `${Math.random().toString(36).slice(2)}.tmp`);
    fs.writeFileSync(p, buf);
    srcFiles.push(p);
    return { path: p, originalname, size: buf.length, mimetype: 'image/png' };
  }

  beforeEach(() => {
    jest.clearAllMocks();
    srcDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cld-src-'));
  });

  afterEach(() => {
    for (const p of srcFiles.splice(0)) {
      try { fs.unlinkSync(p); } catch { /* ignore */ }
    }
    try { fs.rmdirSync(srcDir); } catch { /* ignore */ }
  });

  it('pipes the temp file content into upload_stream', async () => {
    let collected: Buffer | undefined;
    uploadStreamMock.mockImplementation((_opts: any, cb: any) => {
      const w = makeCollectingUploadStream((err, res) => {
        collected = (w as any).__collected;
        cb(err, res);
      });
      return w;
    });

    const strategy = makeStrategy();
    const file = diskFile('cloudinary streamed content', 'photo.png');

    const result = await strategy.upload(file);

    // upload_stream received the exact file bytes via pipe (not pre-buffered)
    expect(collected?.toString()).toBe('cloudinary streamed content');
    expect(result.url).toBe('https://res.cloudinary.com/demo/raw/upload/pid-123');
    // filename = `${timestamp-uuid}${ext}` (generated public_id, not the
    // cloudinary response id), per existing strategy behaviour.
    expect(result.filename).toMatch(/^\d+-[a-f0-9-]+\.png$/);
    expect(result.size).toBe(file.size);
  });

  it('pins resource_type to raw', async () => {
    let opts: any;
    uploadStreamMock.mockImplementation((o: any, cb: any) => {
      opts = o;
      return makeCollectingUploadStream(cb);
    });

    const strategy = makeStrategy();
    await strategy.upload(diskFile('data', 'doc.png'));

    expect(opts.resource_type).toBe('raw');
  });

  it('falls back to buffer when path is absent', async () => {
    let collected: Buffer | undefined;
    uploadStreamMock.mockImplementation((_opts: any, cb: any) => {
      const w = makeCollectingUploadStream((err, res) => {
        collected = (w as any).__collected;
        cb(err, res);
      });
      return w;
    });

    const strategy = makeStrategy();
    await strategy.upload({
      buffer: Buffer.from('legacy buffer path'),
      originalname: 'legacy.png',
      size: 18,
      mimetype: 'image/png',
    });

    expect(collected?.toString()).toBe('legacy buffer path');
  });
});
