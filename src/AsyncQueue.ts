
class AsyncQueue {
  queue: Array<Function> = []
  push (asyncFn: Function) {
    var _this = this
    this.queue.push(() => {
      asyncFn.call(asyncFn, () => _this._next())
    })
  }
  _next () {
    const fn = this.queue.shift()
    if (fn) fn()
  }
  run () {
    this._next()
  }
}

export default AsyncQueue