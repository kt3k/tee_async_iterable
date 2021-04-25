import { tee } from "./tee.ts";

const gen = async function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const [branch1, branch2] = tee(gen());

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
