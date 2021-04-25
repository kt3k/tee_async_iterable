# tee_async_iterable v0.1.0

> [tee](https://en.wikipedia.org/wiki/Tee_%28command%29) for AsyncIterable

# Usage

```ts
import { tee } from "https://deno.land/x/tee_async_iterable@v0.1.0/tee.ts";

// The source async iterator
const gen = async function* gen() {
  yield 1;
  yield 2;
  yield 3;
};

// Branches the source iterator into 2 iterators.
const [branch1, branch2] = tee(gen());

// 2 iterators work independently.
(async () => {
  for await (const n of branch1) {
    console.log(n); // => 1, 2, 3
  }
})();

(async () => {
  for await (const n of branch2) {
    console.log(n); // => 1, 2, 3
  }
})();
```

# License

MIT
