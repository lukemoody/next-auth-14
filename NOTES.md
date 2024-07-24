# Notes

https://next-auth.js.org/

- `npm install next-auth`
- `openssl rand -base64 32` generates a random range of characters which can be used as the Next Auth secret
- Setup folders in `/app` for NextAuth; `api/auth/[...Nextauth]` and create a `routes.ts` file.
- NextAuth doesnt come with USerRoles OOTB. Add a `types` folder with `next-auth.d.ts` and overide the types inline with what we need

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
