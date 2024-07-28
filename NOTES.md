# Notes

https://next-auth.js.org/

- `npm install next-auth`
- `openssl rand -base64 32` generates a random range of characters which can be used as the Next Auth secret
- Setup folders in `/app` for NextAuth; `api/auth/[...Nextauth]` and create a `routes.ts` file.
- NextAuth doesnt come with USerRoles OOTB. Add a `types` folder with `next-auth.d.ts` and overide the types inline with what we need
- DB is with Postgress which is installed/stored locally on Mac, accessible via app `pgAdmin4`
- We are then installing `Prisma` to the codebase to connect to our database
- `bcryptjs` also installed so we can HASH our passowrds in the database

## Google Auth

To setup Google as an auth provider, go to `https://console.cloud.google.com/apis/credentials`

- Create a project
- Create credentials and choose `OAth Client ID`
- Complete the setups, for scopes choose `userinfo.email`
- Setup up callbackURL which will be `http://localhost:3000/api/auth/callback/google` for local development. A production URL will also be needed once live.

## GitHub Auth

To setup GitHub as an auth provider, go to `https://github.com/settings/developers`

- Choose OAuth apps, click `New OAuth app`
- Complete the fields,
- Setup up callbackURL which will be `http://localhost:3000/api/auth/callback/github` for local development. A production URL will also be needed once live

## Other

- For Goole, update `GitHubProvider` to include an ID. Recommended to use sub for this so `id: profile.sub,`

## Prisma

- Run `npx prisma init` to initialise Prisma on the project, creating a `/prisma` folder.
- Update `schema.prisma` accordingly
- Update `DATABASE_URL` in env
- Run `npx prisma migrate dev` to create local DB
- Once ran, go back to pgAdmin 4, and you'll see `AuthDB` under datbases.
- Open this up, open schema, public, tables, right click User `scripts/SELECT scripts`
- This will open up and show us the query to get User data for our field set in projects schema in `schema.prisma`
- Added a `db.ts` file in types folder to create a hook into our prisma database for submitting data

## Production

- Push all work to GIT
- Setup hosting on Vercel
- Setup Prisma DB on vercel. Copy new PROD `DATABASE_URL`
- Make new .env.prod in codebase and update `DATABASE_URL` with new value
- Generate new `NEXTAUTH_SECRET` using `openssl rand -base64 32` and update `.env.prod`.
- Go to `https://github.com/settings/developers` and create new OAuth for PROD and update relevant vars in `.env.prod`.
- Do the same for Goole - `https://console.cloud.google.com/apis/credentials`, setup a new PROD `OAth Client ID` under the account first created (should have two sets of API creds for the project).
- Copy client ID and secret into `.env.prod` and update Vercel.

## Production Database Notes

- You can view PROD DB data by going to your project in Vercel > Storage > YOUR_DB_PROJECT_NAME and going to the section that says Data
- You can click to view tables and data stored in the table will be shown
