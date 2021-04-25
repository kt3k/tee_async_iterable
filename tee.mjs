const noop = () => {
};
class AsyncIterableClone {
  resolveCurrent = noop;
  consume = noop;
  constructor() {
    this.currentPromise = new Promise((resolve) => {
      this.resolveCurrent = resolve;
    });
    this.consumed = new Promise((resolve) => {
      this.consume = resolve;
    });
  }
  reset() {
    this.currentPromise = new Promise((resolve) => {
      this.resolveCurrent = resolve;
    });
    this.consumed = new Promise((resolve) => {
      this.consume = resolve;
    });
  }
  async next() {
    const res = await this.currentPromise;
    this.consume();
    this.reset();
    return res;
  }
  async push(res) {
    this.resolveCurrent(res);
    await this.consumed;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}
function tee1(src, n = 2) {
  const clones = Array.from({
    length: n,
  }).map(() => new AsyncIterableClone());
  (async () => {
    const iter = src[Symbol.asyncIterator]();
    await Promise.resolve();
    while (true) {
      const res = iter.next();
      await Promise.all(clones.map((c) => c.push(res)));
      if ((await res).done) {
        break;
      }
    }
  })().catch((e) => {
    console.error(e);
  });
  return clones;
}
export { tee1 as tee };
