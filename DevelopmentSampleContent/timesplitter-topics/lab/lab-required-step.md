## Solution

Query one hero using leftComparison.

```graphql
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```
