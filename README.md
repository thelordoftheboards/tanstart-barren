# [React TanStarter](https://github.com/dotnize/react-tanstarter)

A starter template for 🏝️ TanStack Start.

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
- [Vite 8](https://vite.dev/blog/announcing-vite8-beta) (beta) + [Nitro v3](https://v3.nitro.build/) (nightly)
- [Drizzle ORM](https://orm.drizzle.team/) + [PostgreSQL](https://www.postgresql.org/)
- [Better Auth](https://www.better-auth.com/)

> [!NOTE]
> This project is a derivative of [React TanStarter by dotnize](https://github.com/dotnize/react-tanstarter) and [Modern Full-Stack Boilerplate by CarlosZiegler](https://github.com/CarlosZiegler/fullstack-start-template).

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/thelordoftheboards/tanstart-barren.git
```

2. Install dependencies:

```bash
bun i
```

3. Create a `.env` file based on [`.env.example`](./.env.example).

4. Push the schema to your database with drizzle-kit:

```bash
bun db push
```

[Drizzle Migrations](https://orm.drizzle.team/docs/migrations).

5. Run the development server:

```bash
bun dev
```

The development server should now be running at [http://localhost:8088](http://localhost:8088).

## Deploying to production

The [vite config](./vite.config.ts#L12-L13) is currently configured to use [Nitro v3](https://v3.nitro.build) (nightly) to deploy on Vercel, but can be easily switched to other providers.

Refer to the [TanStack Start hosting docs](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for deploying to other platforms.

## Issue watchlist

- [Router/Start issues](https://github.com/TanStack/router/issues) - TanStack Start is in RC.
- [Devtools releases](https://github.com/TanStack/devtools/releases) - TanStack Devtools is in alpha and may still have breaking changes.
- [Vite 8 beta](https://vite.dev/blog/announcing-vite8-beta) - We're using Vite 8 beta which is powered by Rolldown.
- [Nitro v3 nightly](https://v3.nitro.build/docs/nightly) - The template is configured with Nitro v3 nightly by default.

## Goodies

#### Scripts

We use **bun** by default, but you can modify these scripts in [package.json](./package.json) to use your preferred package manager.

- **`auth:generate`** - Regenerate the [auth db schema](./src/lib/db/schema/auth.schema.ts) if you've made changes to your Better Auth [config](./src/lib/auth/auth.ts).
- **`db`** - Run [drizzle-kit](https://orm.drizzle.team/docs/kit-overview) commands. (e.g. `bun db generate`, `bun db studio`)
- **`ui`** - The shadcn/ui CLI. (e.g. `bun ui add button`)
- **`format`**, **`lint`**, **`check-types`** - Run biome, and check TypeScript types respectively.
  - **`check`** - Run all three above. (e.g. `bun check`)
- **`deps`** - Selectively upgrade dependencies via taze.

#### Utilities

- [`auth/middleware.ts`](./src/lib/auth/middleware.ts) - Sample middleware for forcing authentication on server functions.
- [`theme-toggle.tsx`](./src/components/theme-toggle.tsx), [`theme-provider.tsx`](./src/components/theme-provider.tsx) - A theme toggle and provider for toggling between light and dark mode.

## License

Code in this template is public domain via [Unlicense](./LICENSE). Feel free to remove or replace for your own project.

## Also check out

- [@tanstack/create-start](https://github.com/TanStack/create-tsrouter-app/blob/main/cli/ts-create-start/README.md) - The official CLI tool from the TanStack team to create Start projects.
- [awesome-tanstack-start](https://github.com/Balastrong/awesome-tanstack-start) - A curated list of awesome resources for TanStack Start.
- [React TanStarter](https://github.com/dotnize/react-tanstarter) - minimalist starter project.
- [Modern Full-Stack Boilerplate](https://github.com/CarlosZiegler/fullstack-start-template) - full stack starter project.
