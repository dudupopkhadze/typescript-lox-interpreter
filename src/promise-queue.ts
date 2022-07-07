type fn<T> = () => Promise<T>;

type Result<T> = { fulfilled: T[]; rejected: any[] };

class PromiseQueue<T> {
  limit: number;
  curPending: number;
  arr: { fun: fn<T>; name: string }[];
  result: Result<T>;
  callback: (result: Result<T>) => void;

  constructor(onFinish: (result: Result<T>) => void) {
    this.callback = onFinish;
    this.limit = 200;
    this.curPending = 0;
    this.arr = [];
    this.result = { fulfilled: [], rejected: [] };
  }

  exec(fn: fn<T>, name: string) {
    this.curPending++;
    console.log(`Starting promise: ${name}`);
    fn()
      .then((res) => {
        this.result.fulfilled.push(res);
      })
      .catch((reason) => {
        this.result.rejected.push(reason);
      })
      .finally(() => {
        this.curPending--;
        if (!this.arr.length) {
          if (!this.curPending) {
            this.callback(this.result);
          }
          return;
        }
        const firstWaitingPromise = this.arr.shift();
        this.exec(firstWaitingPromise!.fun, firstWaitingPromise!.name);
      });
  }

  enqueue(fn: fn<T>, name: string) {
    if (this.curPending >= this.limit) {
      this.arr.push({ fun: fn, name });
    } else {
      this.exec(fn, name);
    }
  }
}
