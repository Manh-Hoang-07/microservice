import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { FileLogger } from '../src/file-logger.service';

// Read a file, retrying for a short window so the async WriteStream has time to
// flush to disk (writes are buffered and non-blocking by design).
async function readWhenReady(filePath: string, timeoutMs = 1000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.length > 0) return content;
    } catch {
      // not written yet
    }
    await new Promise((r) => setImmediate(r));
  }
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

describe('FileLogger (async writes)', () => {
  let baseDir: string;
  let prevLogDir: string | undefined;

  beforeEach(() => {
    baseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'file-logger-'));
    prevLogDir = process.env.LOG_DIR;
    process.env.LOG_DIR = baseDir;
  });

  afterEach(() => {
    if (prevLogDir === undefined) delete process.env.LOG_DIR;
    else process.env.LOG_DIR = prevLogDir;
    fs.rmSync(baseDir, { recursive: true, force: true });
  });

  it('writes one JSON line per save() and creates nested dirs', async () => {
    const logger = new FileLogger();
    const today = new Date().toISOString().slice(0, 10);

    const log = logger.create('auth/register', { email: 'a@b.com' });
    log.addDebug('validating');
    log.save({ userId: 42n });

    const filePath = path.join(baseDir, `auth/register-${today}.log`);
    const content = await readWhenReady(filePath);
    const lines = content.trim().split('\n');

    expect(lines).toHaveLength(1);
    const record = JSON.parse(lines[0]);
    expect(record.input.email).toBe('a@b.com');
    expect(record.output.userId).toBe('42'); // bigint serialised as string
    expect(record.debug).toHaveLength(1);
    expect(record.isError).toBe(0);
  });

  it('save() is non-blocking (returns synchronously, void)', () => {
    const logger = new FileLogger();
    const log = logger.create('auth/login', { email: 'x@y.com' });
    // Must not throw and must return immediately without awaiting disk I/O.
    expect(log.save({ ok: true })).toBeUndefined();
  });

  it('redacts sensitive fields before writing', async () => {
    const logger = new FileLogger();
    const today = new Date().toISOString().slice(0, 10);

    const log = logger.create('auth/password', { password: 'secret123', email: 'z@z.com' });
    log.save();

    const content = await readWhenReady(path.join(baseDir, `auth/password-${today}.log`));
    const record = JSON.parse(content.trim());
    expect(record.input.password).toBe('[REDACTED]');
    expect(record.input.email).toBe('z@z.com');
  });

  it('only the first save() writes a line (idempotent)', async () => {
    const logger = new FileLogger();
    const today = new Date().toISOString().slice(0, 10);

    const log = logger.create('auth/otp', { phone: '0900' });
    log.save({ first: true });
    log.save({ second: true });

    const content = await readWhenReady(path.join(baseDir, `auth/otp-${today}.log`));
    const lines = content.trim().split('\n').filter(Boolean);
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0]).output.first).toBe(true);
  });
});
