# 📂 Api `metadata`

The `metadata` api retrieves metadata information about the npm registry database, including statistics about documents, disk usage, and database status.

## Types

### NpmRegistryMetadata

```typescript
interface NpmRegistryMetadata {
  db_name: string; // Name of the database
  doc_count: number; // Total number of documents in the database
  doc_del_count: number; // Number of deleted documents
  update_seq: number; // Current update sequence number
  purge_seq: number; // Current purge sequence number
  compact_running: boolean; // Whether database compaction is currently running
  disk_size: number; // Total disk size used by the database (in bytes)
  data_size: number; // Size of the actual data (in bytes)
  instance_start_time: string; // When the database instance was started (ISO format)
  disk_format_version: number; // Version of the disk format being used
  committed_update_seq: number; // Last committed update sequence number
}
```

## Syntax

```typescript
metadata(): Promise<NpmRegistryMetadata>
```

## Parameters

This function takes no parameters.

## Returns

Returns a `Promise<NpmRegistryMetadata>` containing comprehensive metadata about the npm registry database, including document counts, disk usage statistics, and operational status.

## Examples

### Get registry metadata

```typescript
import { metadata } from "npm-registry-sdk";

const registryInfo = await metadata();
console.log(`Database: ${registryInfo.db_name}`);
console.log(`Total packages: ${registryInfo.doc_count}`);
console.log(`Deleted packages: ${registryInfo.doc_del_count}`);
console.log(`Disk size: ${(registryInfo.disk_size / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`Data size: ${(registryInfo.data_size / 1024 / 1024 / 1024).toFixed(2)} GB`);
```
