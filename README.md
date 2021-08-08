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
$ npm i @nodesecure/js-x-ray
# or
$ yarn add @nodesecure/js-x-ray
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
### metadata(): Promise<NpmRegistryMetadata>

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

### packument(name: string, options?: PackumentOptions): Promise<npm.Packument>

```ts
interface PackumentOptions {
  token: string;
}
```

### packumentVersion(name: string, version: string, options?: packumentOptions): Promise<npm.PackumentVersion>

## License
MIT
