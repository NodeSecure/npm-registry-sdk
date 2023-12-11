<p align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/4438263/265200236-271ccda6-82b9-457a-956b-2cb855e2ff68.jpg" alt="@nodesecure/npm-registry-sdk">
</p>

<p align="center">
    <a href="https://github.com/NodeSecure/npm-registry-sdk">
      <img src="https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/NodeSecure/npm-registry-sdk/master/package.json&query=$.version&label=Version" alt="npm version">
    </a>
    <a href="https://github.com/NodeSecure/npm-registry-sdk/graphs/commit-activity">
      <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge" alt="maintenance">
    </a>
    <a href="https://github.com/NodeSecure/npm-registry-sdk/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/NodeSecure/npm-registry-sdk.svg?style=for-the-badge" alt="license">
    </a>
    <a href="https://api.securityscorecards.dev/projects/github.com/NodeSecure/npm-registry-sdk">
      <img src="https://api.securityscorecards.dev/projects/github.com/NodeSecure/npm-registry-sdk/badge?style=for-the-badge" alt="ossf scorecard">
    </a>
    <a href="https://github.com/NodeSecure/npm-registry-sdk/actions?query=workflow%3A%22Node.js+CI%22">
      <img src="https://img.shields.io/github/actions/workflow/status/NodeSecure/npm-registry-sdk/node.js.yml?style=for-the-badge" alt="github ci workflow">
    </a>
</p>

Node.js SDK to fetch data from the npm API (with up to date TypeScript types)

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/npm-registry-sdk
# or
$ yarn add @nodesecure/npm-registry-sdk
```

## Usage example

```ts
import * as Npm from "@nodesecure/npm-registry-sdk";

const packument: Npm.Packument = await Npm.packument("express");
console.log(packument);
```

<kbd>packument</kbd> and <kbd>packumentVersion</kbd> take an optional payload options which can be used to provide an NPM token.

```ts
import * as Npm from "@nodesecure/npm-registry-sdk";

const user: NpmUserProfile = await Npm.user("test-user");
console.log(user);
```

<kbd>user</kbd> takes an optional payload pagination which can be used to set page number and page size to be used for paginated properties of the user like <kbd>pacakges</kbd>.
## API

### getNpmRegistryURL(): string

### getLocalRegistryURL(): string

### setLocalRegistryURL(value: string | URL): string

### loadRegistryURLFromLocalSystem(mixins?: LoadRegistryMixins): string

```ts
interface LoadRegistryMixins {
  spawn?: typeof spawnSync;
}
```

### metadata(): Promise\<NpmRegistryMetadata>

```ts
interface NpmRegistryMetadata {
  db_name: string;
  doc_count: number;
  doc_del_count: number;
  update_seq: number;
  purge_seq: number;
  compact_running: boolean;
  disk_size: number;
  data_size: number;
  instance_start_time: string;
  disk_format_version: number;
  committed_update_seq: number;
}
```

### packument(name: string, options?: PackumentOptions): Promise\<Packument>

```ts
interface Packument {
  _id: string;
  _rev: string;
  name: string;
  readme?: string;
  description?: string;
  'dist-tags': { latest?: string } & ObjectOfStrings;
  versions: {
    [key: string]: PackumentVersion
  };
  maintainers: Maintainer[];
  time: {
    modified: string,
    created: string,
    [key: string]: string
  };
  users?: {
    [key: string]: boolean;
  }
  contributors?: Maintainer[];
  homepage?: string;
  keywords?: string[];
  repository?: Repository;
  author?: Maintainer;
  bugs?:  { url: string };
  license: string;
  // left out users (stars) deprecated, and attachments (does nothing)
  readmeFilename?: string;
}
```

### packumentVersion(name: string, version: string, options?: PackumentOptions): Promise\<PackumentVersion>

```ts
type PackumentVersion = PackageJson & {
  gitHead?: string;
  maintainers: Maintainer[];
  dist: Dist;
  types?: string;
  deprecated?: string;
  _id: string;
  _npmVersion: string;
  _nodeVersion: string;
  _npmUser: Maintainer;
  _hasShrinkwrap?: boolean;
  _engineSupported?: boolean;
  _defaultsLoaded?: boolean;
  _npmOperationalInternal?: {
    host: string;
    tmp: string;
  }
};
```

### downloads(pkgName: string, period: Period = "last-week"): Promise< NpmPackageDownload >

```ts
interface NpmPackageDownload {
  downloads: number;
  start: string;
  end: string;
  package: string;
}
```

### user(username: string, pagination: Partial< Pagination > = {}): Promise< NpmUserProfile >

```ts
interface Pagination {
  perPage: number;
  page: number;
}

interface NpmPackage {
  id: number;
  name: string;
  description: string;
  maintainers: string[];
  version: string;
}

interface NpmUserProfile {
  id: number;
  name: string;
  fullname?: string;
  accounts: {
    twitter?: string;
    github?: string;
  };
  avatars: {
    small: string;
    medium: string;
    large: string;
  };
  packages: {
    total: number;
    objects: NpmPackage[];
    urls: {
      next: string;
      prev: string;
    }
  };
  pagination: Pagination;
}
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/QuentinLpy"><img src="https://avatars.githubusercontent.com/u/31780359?v=4?s=100" width="100px;" alt="Quentin Lepateley"/><br /><sub><b>Quentin Lepateley</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=QuentinLpy" title="Code">💻</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=QuentinLpy" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/pulls?q=is%3Apr+reviewed-by%3AQuentinLpy" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Rossb0b"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt="Nicolas Hallaert"/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=Rossb0b" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tekeuange23"><img src="https://avatars.githubusercontent.com/u/35274201?v=4?s=100" width="100px;" alt="tekeuange23"/><br /><sub><b>tekeuange23</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=tekeuange23" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://tonygo.dev"><img src="https://avatars.githubusercontent.com/u/22824417?v=4?s=100" width="100px;" alt="Tony Gorez"/><br /><sub><b>Tony Gorez</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=tony-go" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hirok.io"><img src="https://avatars.githubusercontent.com/u/1075694?v=4?s=100" width="100px;" alt="hiroki osame"/><br /><sub><b>hiroki osame</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=privatenumber" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fabnguess"><img src="https://avatars.githubusercontent.com/u/72697416?v=4?s=100" width="100px;" alt="Kouadio Fabrice Nguessan"/><br /><sub><b>Kouadio Fabrice Nguessan</b></sub></a><br /><a href="#maintenance-fabnguess" title="Maintenance">🚧</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=100" width="100px;" alt="PierreDemailly"/><br /><sub><b>PierreDemailly</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=PierreDemailly" title="Code">💻</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=PierreDemailly" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=PierreDemailly" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
