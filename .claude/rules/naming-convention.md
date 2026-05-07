---
description: Quy tac dat ten
globs: "**/*.ts"
---

# Naming Convention

- **Thu muc & file:** kebab-case (`comic.controller.ts`, `create-comic.dto.ts`, `comic-status.enum.ts`)
- **Class:** PascalCase (`ComicService`, `CreateComicDto`)
- **Interface repository:** prefix I (`IComicRepository`)
- **Enum:** PascalCase (`ComicStatus`)
- **Bien & method:** camelCase (`userId`, `findMany`)
- **Constant & token:** UPPER_SNAKE_CASE (`JWT_SECRET`, `COMIC_REPOSITORY`)
- **Prisma model:** PascalCase so it (`Comic`, `Chapter`)
- **DB field:** camelCase trong Prisma, map sang snake_case trong DB neu can
