# 📂 Api `search`

The `search` api allows you to search for npm packages using various criteria including text search, popularity, quality, and maintenance scores.

## Types

### SearchCriteria

```typescript
interface SearchCriteria {
  text?: string; // Full-text search to apply
  size?: number; // How many results should be returned (default 20, max 250)
  from?: number; // Offset to return results from
  quality?: number; // How much effect quality should have on search results (0-1)
  popularity?: number; // How much effect popularity should have on search results (0-1)
  maintenance?: number; // How much effect maintenance should have on search results (0-1)
}
```

### SearchMaintainer

```typescript
interface SearchMaintainer {
  email: string;
  username: string;
}
```

### SearchResult

```typescript
interface SearchResult {
  objects: {
    package: {
      name: string; // Package name
      scope: string; // Package scope
      version: string; // Latest version
      description: string; // Package description
      keywords?: string[]; // Package keywords
      date: string; // Last publication date
      links: {
        npm: string; // npm package URL
        homepage?: string; // Package homepage
        bugs?: string; // Bug tracker URL
        repository?: string; // Repository URL
      };
      author: SearchMaintainer & { name?: string }; // Package author
      publisher: SearchMaintainer; // User who published latest version
      maintainers: SearchMaintainer[]; // Package maintainers
    };
    score: {
      final: number; // Final computed score
      detail: {
        quality: number; // Quality score (0-1)
        popularity: number; // Popularity score (0-1)
        maintenance: number; // Maintenance score (0-1)
      };
    };
    searchScore: number; // Text search relevance score
  }[];
  total: number; // Total number of results
  time: string; // Search execution time
}
```

## Syntax

```typescript
search(criteria: SearchCriteria, options?: DefaultRegistryApiOptions): Promise<SearchResult>
```

## Parameters

- **criteria** (SearchCriteria): The search criteria object
  - **text** (string, optional): Full-text search query
  - **size** (number, optional): Number of results to return (default 20, max 250)
  - **from** (number, optional): Offset for pagination
  - **quality** (number, optional): Quality weight (0-1, affects scoring)
  - **popularity** (number, optional): Popularity weight (0-1, affects scoring)
  - **maintenance** (number, optional): Maintenance weight (0-1, affects scoring)
- **options** (DefaultRegistryApiOptions, optional): Additional options including authentication token

## Returns

Returns a `Promise<SearchResult>` containing search results with package information, scores, and metadata.

## Examples

### Basic text search

```typescript
import { search } from "npm-registry-sdk";

const results = await search({ text: "express" });
console.log(`Found ${results.total} packages matching "express"`);

results.objects.forEach(({ package: pkg, score }) => {
  console.log(`${pkg.name}: ${pkg.description}`);
  console.log(`Score: ${score.final.toFixed(3)}`);
});
```
