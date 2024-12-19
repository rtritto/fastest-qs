# ARCHIVED
Repository moved to [templates-ecosystem](https://github.com/node-ecosystem/fastest-qs).

# fastest-qs

This project is an object version is an exported `fast-querystring` used by [Elysia](https://github.com/elysiajs/elysia) ([source](https://github.com/elysiajs/elysia/blob/main/src/fast-querystring.ts)), which in turn is inspired by the original [fast-querystring](https://github.com/anonrig/fast-querystring).

## Installation

To install the package, run the following command:

```sh
yarn add fastest-qs
```

## Usage

```ts
import { parseQueryFromURL } from 'fastest-qs'

const queryURL = 'q=1&q2'

const query = parseQueryFromURL(queryURL)

console.log('Query:', query)   // { q: 1, q: 2 }
```

## License

This project is licensed under the [MIT License](LICENSE).

Licenses for third-party projects are listed in [THIRD-PARTY-LICENSE](THIRD-PARTY-LICENSE).
