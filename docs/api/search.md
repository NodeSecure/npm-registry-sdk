# 📂 Api `search`

The `search` api allows you to search for npm packages using various criteria including text search, popularity, quality, and maintenance scores.

## Syntax

```typescript
search(criteria: SearchCriteria, options?: DefaultRegistryApiOptions): Promise<SearchResult>
```

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
