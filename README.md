# [TanStart Barren](https://github.com/thelordoftheboards/tanstart-barren)



## Boilerplate for 🏝️ TanStack Start.

This boilerplate is part of a family of boilerplates:

<table>
  <tr>
    <th>Boilerplate</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="https://github.com/thelordoftheboards/tanstart-barren">Tanstart Barren</a></td>
    <td>Barebones boilerplate with Tanstack Start and basic Better Auth with password auth. Log in/sign on pages, dashboard and home page.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/thelordoftheboards/tanstart-cumberland">Tanstart Cumberland</a></td>
    <td>Expands Tanstart Barren with Better Auth with organizations, account and admin screens, side bar for navigation and layout examples.</td>
  </tr>
  <tr>
    <td>Tanstart Dale Hollow (TBD)</td>
    <td>Expands Tanstart Cumberland with email and mastra integration.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/thelordoftheboards/tanstart-eddy">Tanstart Eddy</a></td>
    <td>Expands Tanstart Dale Hollow with examples of CRUD functionality.</td>
  </tr>
</table>

> [!NOTE]
> These boilerplates are derived from [React TanStarter by dotnize](https://github.com/dotnize/react-tanstarter) and [Modern Full-Stack Boilerplate by CarlosZiegler](https://github.com/CarlosZiegler/fullstack-start-template) as well as various examples from [TanStack Start](https://tanstack.com/start/latest) and other sources.

Features:

- [Bun](https://bun.com/) runtime
- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- [Biome](https://biomejs.dev/formatter/)
- TanStack:
  - [Start](https://tanstack.com/start/latest)
  - [Router](https://tanstack.com/router/latest)
  - [Query](https://tanstack.com/query/latest)
  - [Forms](https://tanstack.com/form/latest)
  - [DevTools](https://tanstack.com/devtools/latest)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/)
- [Vite 8](https://vite.dev/blog/announcing-vite8-beta) (beta) + [Nitro v3](https://v3.nitro.build/) (alpha)
- [Drizzle ORM](https://orm.drizzle.team/) + [PostgreSQL](https://www.postgresql.org/)
- [Better Auth](https://www.better-auth.com/)



## Development Setup



### Clone The Repository

```bash
git clone https://github.com/thelordoftheboards/tanstart-barren.git
```

or

```bash
git clone https://github.com/thelordoftheboards/tanstart-cumberland.git
```

or

```bash
git clone https://github.com/thelordoftheboards/tanstart-eddy.git
```




### Install Dependencies

```bash
bun i
```


### Create a Database

Postgres 18 with vector extensions is required. You can set up your own database, or use docker compose as described:

* Use [`doc/standalone-db.env.example`](doc/standalone-db.env.example) to create [`devconfig/standalone-db.env`](devconfig/standalone-db.env).

* Using the setting you specified for `PROJECT_NAME`, create a docker network:

```bash
docker network create ${PROJECT_NAME}-standalone-db-network
```

Example for `PROJECT_NAME` being `my-project`:

```bash
docker network create my-project-standalone-db-network
```

* Compose up the database container:

```bash
bun compose:db:up
```


### Create an `.env` File

Use example [`doc/.env.example`](doc/.env.example). If using the provided copose postgres container, the `DATABASE_URL` will be:

```bash
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_EXPOSED_PORT}/${POSTGRES_DB}
```

for instance

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/database-name
```


### Generate the schema to your database with drizzle-kit:

```bash
bun db:generate
```

You can also push the schema to your database with drizzle-kit:

```bash
bun db:push
```

Alternatively, if the environment variable `DATABASE_AUTOMATIC_MIGRATIONS=enabled`, the application will perform migrations when started in development mode, or upon the first request that is recevied in production. For more details [Drizzle Migrations](https://orm.drizzle.team/docs/migrations).



### Run the development server:

```bash
bun dev
```

The development server should now be running at [http://localhost:8088](http://localhost:8088).



## Deploying to production

The [vite config](./vite.config.ts#L15-L16) is currently configured to use [Nitro v3](https://v3.nitro.build) (nightly) to deploy on Vercel, but can be easily switched to other providers.

Refer to the [TanStack Start hosting docs](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for deploying to other platforms.



## Using Docker

Create [docker-settings.sh](./devconfig/docker-settings.sh) following the example in [docker-settings.sh.example](./doc/docker-settings.sh.example).

Scripts:

- **`docker:setup`** - Creates common docker objects used by the project. Run once before using the other scripts.
- **`ocker:build`** - Builds a dockerized version of the application.
- **`docker:run`** - Runs the built version.
- **`compose:db:up`** - Starts a database that can be used by `bun run`.
- **`compose:db:down`** - Destroys the database used by `bun run`.
- **`compose:full:up`** - Starts the database and app server together.
- **`compose:full:down`** - Destroys the database and app server together.
- **`docker:remove`** - Removes (some) of the docker objects created for the project.



## Deploying using Dokploy

In addition to the using variables in `.env` add the following to the environment settings, where the domain is specified to be the domain you will be serving from:

```bash
NODE_ENV=production
SERVER_HOST=example.com
```

Also, if you wish to store the build in the repositoru, in order for the build assets to get properly added to the repository, `.gitignore` will have to be modified:

```bash
# In our case to we use the .output directory to build the container so it is required in source
#.output
```

Also modify `docker-build.sh`:

```bash
# Uncomment for the build to be happening outisde of docker
# Run make if the versions do not match
if [ "${PACKAGE_VERSION}" != "${PACKAGE_VERSION_OUTPUT}" ]; then
    echo "Version mismatch, running make ..."
    (cd ${SCRIPT_DIR}/.. && bun run make)
    echo "Make complete."
else
    # Commands to execute if they are the same (optional 'else' block)
    echo "Versions match, proceeding to build container."
fi
```

For the database server the recommended image is `pgvector/pgvector:pg18` and the the mount `/var/lib/postgresql`



## Issue watchlist

- [Router/Start issues](https://github.com/TanStack/router/issues) - TanStack Start is in RC.
- [Devtools releases](https://github.com/TanStack/devtools/releases) - TanStack Devtools is in alpha and may still have breaking changes.
- [Vite 8 beta](https://vite.dev/blog/announcing-vite8-beta) - We're using Vite 8 beta which is powered by Rolldown.
- [Nitro v3 nightly](https://v3.nitro.build/docs/nightly) - The template is configured with Nitro v3 alpha by default, read the nightly documentation.



## Scripts

We use **bun** by default, but you can modify these scripts in [package.json](./package.json) to use your preferred package manager.

- **`auth:generate`** - Regenerate the [auth db schema](./src/lib/db/schema/auth.schema.ts) if you've made changes to your [Better Auth config](./src/lib/auth/auth.ts). Notice that the IDs have been changed to uuid manually, and if you want to keep them that way you would have to re-do the process.
- **`db`** - Run [drizzle-kit](https://orm.drizzle.team/docs/kit-overview) commands. (e.g. `bun db generate`, `bun db studio`)
- **`ui`** - The shadcn/ui CLI. (e.g. `bun ui add button`)
- **`format`**, **`lint`**, **`check-types`** - Run biome, and check TypeScript types respectively.
  - **`check`** - Run all three above. (e.g. `bun check`)



## Using Local Tunnel

In order to expose the development server over https to the world using [localtunnel](https://theboroer.github.io/localtunnel-www/) update [devconfig/localtunnel-settings.sh](./devconfig/localtunnel-settings.sh) using the example from [localtunnel-settings.sh.example](./doc/localtunnel-settings.sh.example) :

- `LOCALTUNNEL_SUBDOMAIN` is the subdomain argument that is passed to local tunnel. Notice that if it is taken localtunnel might provide an alternative subdomain.
- `SERVER_HOST` is the URL where it has the subdomain prepended, essentially `${LOCALTUNNEL_SUBDOMAIN}.loca.lt`.

Use one of the following scripts:

- **`lt`** - serve through localtunnel in a separate process.
- **`dev-lt`** - run development concurrently with serving through localtunnel, might have issues.
- **`start-lt`** - run development concurrently with serving through localtunnel, should perform well.



## Utilities

- [`auth/middleware.ts`](./src/lib/auth/middleware.ts) - Sample middleware for forcing authentication on server functions.
- [`theme-toggle.tsx`](./src/components/theme-toggle.tsx), [`theme-provider.tsx`](./src/components/theme-provider.tsx) - A theme toggle and provider for toggling between light and dark mode.



## License

Code in this template is public domain via [Unlicense](./LICENSE). Feel free to remove or replace for your own project.



## Also check out

- [@tanstack/create-start](https://github.com/TanStack/create-tsrouter-app/blob/main/cli/ts-create-start/README.md) - The official CLI tool from the TanStack team to create Start projects.
- [awesome-tanstack-start](https://github.com/Balastrong/awesome-tanstack-start) - A curated list of awesome resources for TanStack Start.
- [React TanStarter](https://github.com/dotnize/react-tanstarter) - minimalist starter project, the starting point for this project.
- [Modern Full-Stack Boilerplate](https://github.com/CarlosZiegler/fullstack-start-template) - full stack starter project, a place where some of the configuration and ideas are borrowed from.
