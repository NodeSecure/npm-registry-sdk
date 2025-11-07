# 📂 Api `metadata`

The `metadata` api retrieves metadata information about the npm registry database, including statistics about documents, disk usage, and database status.

## Syntax

```typescript
metadata(): Promise<NpmRegistryMetadata>
```

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
