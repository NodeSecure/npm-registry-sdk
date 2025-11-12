# 📂 Api `keys`

The `keys` api retrieves the public keys used by the npm registry for package signature verification.

## Syntax

```typescript
keys(): Promise<RegistryKey[]>
```

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
