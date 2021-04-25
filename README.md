# async_iterable_tee v0.1.0

> [tee](https://man7.org/linux/man-pages/man1/tee.1.html) for AsyncIterable

# Usage

```ts
import { tee } from "https://deno.land/x/tee@v0.1.0/tee.ts";

const iter = async function* iter() {
  yield 1;
  yield 2;
  yield 3;
};

const [i0, i1, i2] = tee(iter, 3);
```
