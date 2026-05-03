import { SetMetadata } from '@nestjs/common';

export const PERMS_KEY = 'perms_required';

export const Permission = (...permissions: string[]) =>
  SetMetadata(PERMS_KEY, permissions);

export const Public = () => SetMetadata(PERMS_KEY, ['public']);

export const Internal = () => SetMetadata(PERMS_KEY, ['internal']);
