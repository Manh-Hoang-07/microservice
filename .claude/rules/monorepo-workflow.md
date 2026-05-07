---
description: Quy tac lam viec trong monorepo
globs: "**/*.ts,**/package.json"
---

# Monorepo Workflow

`npm run build:shared` BAT BUOC chay truoc khi build/test bat ky service nao. Shared packages co dependency lan nhau, build theo thu tu co dinh.

Thay doi shared anh huong TAT CA service — can than khi sua.

Module moi dat trong `apps/<service>/src/modules/<domain>/`, dang ky trong `app.module.ts`.

Dependency dung chung dat root `package.json`, dependency rieng dat `apps/<service>/package.json`.

File .env trong `apps/<service>/.env` — KHONG o root. Docker dung `.env.docker` o root.

Build production: `npm run build:shared` → `npm -w apps/<service> run build`. Dockerfile tu dong hoa 2 buoc nay.
