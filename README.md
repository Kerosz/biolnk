<h1 align="center">
  <a href="http://www.biolnk.me">
    <img src="./apps/studio/src/assets/images/biolnk.png" alt="Biolnk branding" />
  </a>
  <br />
  Biolnk
  <br />
</h1>
<p align="center">Combine all your online content into one short, easy Biolink
</p>

<p align="center">
  <a href="#about-the-project">About</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#feedback">Feedback</a> •
  <a href="#license">License</a>
</p>

<!-- Links -->

## Quick links

- **Studio:** [Biolnk Studio](https://app.biolnk.me)
- **Web:** [Biolnk Web](https://biolnk.me/)

<!-- ABOUT THE PROJECT -->

## About The Project

The digital world and social media is dictating our lives nowadays, we need means to promote and advertise ourselves and our work.

**Biolnk** lets you create beautiful pages filled with links to all your online content with just a few taps. Customize your biolink page to fit your brand with your logo, the right colors, background image and much more. You get one link you can share anywhere, on platforms like `Instagram` or `TikTok` that only allow for one link.

> **NOTE:** Biolnk came together as a fun project to try out new tech out there.

### Key Features

- Link management
  - Add/remove and reorder your links
  - Preview mode to only show the links you want
- Page customization
  - Chose the style that fits you from multiple themes
  - Add a personal description about you or your brand
  - Chose your brand identity
  - Add your own SEO title & description for best results
  - Add your own custom domain or have a custom sub-domain provided by us
- Page and link analytics
  - Track your overall page views
  - Track the performance of your links

### Built With

The entire codebase consists in **JavaScript/TypeScript**, here is a list of technologies used:

- **[TurboRepo](https://turborepo.org/)**: Monorepo tool
- **[NextJs](https://nextjs.org/)**: Front-end framework
- **[Supabase](https://supabase.com/)**: BE services
- **[React-Query](https://react-query.tanstack.com/)**: Data fetching and caching
- **[TailwindCSS](https://tailwindcss.com/)**: CSS framework

### Directory Structure

There is also a diagram that shows the repository architecture & indexing, you [can check out the file here](https://www.figma.com/file/bhRxnWHj0PG4BFBQNVeNIc/Biolnk-Repository-Architecture?node-id=0%3A1)

`biolnk/`<br>
`├──`[`apps`](./apps) — web/mobile applications<br>
`├────`[`studio`](./apps/studio) — app dashboard<br>
`├────`[`web`](./apps/web) — web app, used for page generation<br>
`├──`[`packages`](./packages) — internal libs<br>
`├────`[`cli`](./packages/cli) — tool used for codegen<br>
`├────`[`core`](./packages/core) — shared module across packs and apps<br>
`└────`[`gamut`](./packages/gamut) — internal UI component lib<br>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/Kerosz/biolnk/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Getting Started

### Contributing

Any contributions you make are **greatly appreciated**. There are many ways in which you can participate in this project, for example:

- [Submit bugs and feature requests](https://github.com/Kerosz/biolnk/issues/new/choose), and help us verify as they are checked in
- Review [source code changes](https://github.com/Kerosz/biolnk/pulls)

If you are interested in fixing issues and contributing directly to the code base,
please see the document [How to Contribute](./CONTRIBUTING.md), which covers the following:

### Prerequisites

We require you to use `volta` to manage your npm and node environment versions and `pnpm` to install dependencies

- volta
  - [Getting Started](https://docs.volta.sh/guide/getting-started)
- pnpm
  - [Getting Started](https://pnpm.io/installation)

### Installation

1. Fork the project
2. Clone the repo
3. Install PNPM packages
   ```sh
   pnpm i
   ```
4. Build packages
   ```sh
   pnpm build
   ```
5. Run development server
   ```sh
   pnpm dev
   ```

### Branching & PRs

1. Create your Feature Branch (`git checkout -b feat/some-amazing-feature`)
2. Commit your Changes (`git commit -m "feat: add some amazing feature"`)
3. Push to the Branch (`git push -u origin feat/some-amazing-feature`)
4. Open a Pull Request

We require all new PRs to follow these guidelines. Any PR should use [git keywords](https://docs.github.com/en/enterprise-server@3.0/github/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests)

```sh
<description> [Detailed description of the PR, it can be used the initial issue description]

Resolves #<issue_number>
```

### Feedback

- [Request a new feature](https://github.com/Kerosz/biolnk/issues/new?assignees=&labels=feature-request&template=feature_request.md&title=%5BRequest%5D+My+feature+request+title)
- Upvote [feature requests](https://github.com/Kerosz/biolnk/labels/feature-request)
- [File an issue](https://github.com/Kerosz/biolnk/issues/new/choose)

## License

Licensed under the BSD-3-Clause license. See [BSD-3-Clause](LICENSE) for more information.

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Prettier](https://prettier.io/)
- [EsLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

---
