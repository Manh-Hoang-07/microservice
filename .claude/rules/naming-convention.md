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

## Naming theo audience layer

Moi lop phai co prefix ro rang de tranh trung ten va nham lan scope:

| Lop | File | Class |
|-----|------|-------|
| admin | `post.controller.ts` | `PostController` |
| group | `group-post.controller.ts` | `GroupPostController` |
| user | `user-post.controller.ts` | `UserPostController` |
| public | `post.controller.ts` | `PostPublicController` |

- Service group dung prefix `Group` (`GroupPostService`, `GroupComicService`)
- Service admin khong can prefix (`PostService`, `ComicService`)
- Rieng module `group` (iam-service): lop group-scoped dung ten mo ta nhu `GroupOwnerService` de tranh trung voi `GroupService` (admin)
