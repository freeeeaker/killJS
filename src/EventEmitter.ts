class EventEmitter {
  events: Object = {}
  on (name: string, fn: Function) {
    if (this.events[name]) {
      this.events[name].push(fn)
    } else {
      this.events[name] = [fn]
    }
  }
  off (name: string, fn: Function) {
    if (!fn) {
      this.events[name] = []
    } else if (this.events[name]) {
      let index = -1
      while ((index = this.events[name].indexOf(fn)) !== -1) {
        this.events[name].splice(index, 1)}
      } 
  }
  once (name: string, fn: Function) {
    const _this = this
    this.on(name, function once () {
      fn.apply(fn, arguments)
      _this.off(name, once)
    })
  }
  emit (name: string, ...args: Array<any>) {
    if (this.events[name]) {
      this.events[name].forEach(fn => {
        fn.apply(fn, args)
      })
    }
  }
}

export default EventEmitter