import { tee } from "./tee.ts";
import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";

const gen = async function* iter() {
  yield 1;
  yield 2;
  yield 3;
};

async function accumulate<T>(src: AsyncIterable<T>): Promise<T[]> {
  const res: T[] = [];
  for await (const item of src) {
    res.push(item);
  }
  return res;
}

Deno.test('tee - 2 branches', async () => {
  const iter = gen();
  const [res0, res1] = tee(iter).map(accumulate); 
  assertEquals(
    await Promise.all([res0, res1]),
    [
      [1, 2, 3],
      [1, 2, 3],
    ]
  );
});

Deno.test('tee - 3 branches', async () => {
  const iter = gen();
  const [res0, res1, res2] = tee(iter, 3).map(accumulate); 
  assertEquals(
    await Promise.all([res0, res1, res2]),
    [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]
  );
});

Deno.test('tee - delayed consumption', async () => {
  const iter = gen();
  const iters = tee(iter, 3);

  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 20);
  });

  assertEquals(
    await Promise.all(iters.map(accumulate)),
    [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]
  );
});
