# npm-registry-sdk
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/npm-registry-sdk/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/npm-registry-sdk/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/npm-registry-sdk/blob/master/LICENSE)
![dep](https://img.shields.io/david/NodeSecure/npm-registry-sdk)

Node.js SDK to fetch data from the npm API.

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/npm-registry-sdk
# or
$ yarn add @nodesecure/npm-registry-sdk
```

## Usage example

```ts
import Registry from "@nodesecure/npm-registry-sdk";
```
## API

### getNpmRegistryURL(): string
### getLocalRegistryURL(): string
### setLocalRegistryURL(value: string | URL): string
### loadRegistryURLFromLocalSystem(): string
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

### packument(name: string, options?: PackumentOptions): Promise\<npm.Packument>

```ts
interface PackumentOptions {
  token: string;
}
```

### packumentVersion(name: string, version: string, options?: packumentOptions): Promise\<npm.PackumentVersion>


## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/QuentinLpy"><img src="https://avatars.githubusercontent.com/u/31780359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Quentin Lepateley</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=QuentinLpy" title="Code">💻</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=QuentinLpy" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/npm-registry-sdk/pulls?q=is%3Apr+reviewed-by%3AQuentinLpy" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Rossb0b"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-registry-sdk/commits?author=Rossb0b" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
