# 📂 Api `keys`

The `keys` api retrieves the public keys used by the npm registry for package signature verification.

## Types

### RegistryKey

```typescript
interface RegistryKey {
  keyid: string; // Unique identifier for the key
  keytype: string; // Type of the key (e.g., "ecdsa-sha2-nistp256")
  scheme: string; // Signing scheme used with this key
  key: string; // Base64-encoded public key
  pemkey: string; // PEM-formatted public key
  expires: string | null; // Expiration date in ISO format, or null if no expiration
}
```

## Syntax

```typescript
keys(): Promise<RegistryKey[]>
```

## Parameters

This function takes no parameters.

## Returns

Returns a `Promise<RegistryKey[]>` containing an array of public keys used by the npm registry. Each key includes both the raw base64-encoded format and a PEM-formatted version for convenience.

## Examples

### Get all registry keys

```typescript
import { keys } from "npm-registry-sdk";

const registryKeys = await keys();
console.log(`Found ${registryKeys.length} registry keys`);

registryKeys.forEach((key) => {
  console.log(`Key ID: ${key.keyid}`);
  console.log(`Key Type: ${key.keytype}`);
  console.log(`Scheme: ${key.scheme}`);
  console.log(`Expires: ${key.expires || "No expiration"}`);
});
```

### Use PEM-formatted key for verification

```typescript
const registryKeys = await keys();
const firstKey = registryKeys[0];

// The pemkey is already formatted for use with crypto libraries
console.log(firstKey.pemkey);
// Output:
// -----BEGIN PUBLIC KEY-----
// [base64 encoded key content]
// -----END PUBLIC KEY-----
```

### Filter keys by type

```typescript
const registryKeys = await keys();
const ecdsaKeys = registryKeys.filter((key) => key.keytype.includes("ecdsa"));
console.log(`Found ${ecdsaKeys.length} ECDSA keys`);
```
