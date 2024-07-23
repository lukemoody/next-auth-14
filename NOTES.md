# Notes

https://next-auth.js.org/

- `npm install next-auth`
- `openssl rand -base64 32` generates a random range of characters which can be used as the Next Auth secret
- Setup folders in `/app` for NextAuth; `api/auth/[...Nextauth]` and create a `routes.ts` file.
- NextAuth doesnt come with USerRoles OOTB. Add a `types` folder with `next-auth.d.ts` and overide the types inline with what we need
