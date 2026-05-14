export enum PostType {
  text = 'text',
  video = 'video',
  image = 'image',
  audio = 'audio',
}

export const PostTypeOptions = [
  { id: PostType.text, name: 'Văn bản' },
  { id: PostType.video, name: 'Video' },
  { id: PostType.image, name: 'Hình ảnh' },
  { id: PostType.audio, name: 'Âm thanh' },
];
