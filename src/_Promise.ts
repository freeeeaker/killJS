const empty = x => x

function _Promise (fn) {
  if (!((this as any) instanceof _Promise)) {
    return new _Promise(fn)
  }
  this.status = 'initial'
  this.resolveFnArray = []
  this.rejectFnArray = []
  fn(this.resolve.bind(this), this.reject.bind(this))
}

_Promise.prototype.resolve = function (value) {
  if (this.status !== 'initial') return
  this.status = 'resolved'
  this._value = value
  this.resolveFnArray.forEach(fn => fn(value))
}

_Promise.prototype.reject = function (error) {
  if (this.status !== 'initial') return
  this.status = 'rejected'
  this._error = error
  this.rejectFnArray.forEach(fn => fn(error))
}

_Promise.prototype.then = function (resolveFn, rejectFn = empty) {
  if (this.status === 'initial') {
    const event = {
      events: {},
      one: (name, fn) => {
        this.events[name] = function (value) {
          fn(value)
          delete this.events[name]
        }
      },
      emit: (name, value) => {
        this.events[name](value)
      }
    }
    this.resolveFnArray.push(function (value) {
      event.emit('resolve', resolveFn(value))
    })
    this.rejectFnArray.push(function (error) {
      event.emit('reject', rejectFn(error))
    })
    return new _Promise((resolve, reject) => {
      event.one('resolve', value => resolve(value))
      event.one('reject', error => reject(error))
    })
  } else if (this.status === 'resolved') {
    return _Promise.resolve(resolveFn(this._value))
  }
  return _Promise.reject(rejectFn(this._error))
}

_Promise.prototype.catch = function (fn) {

}

_Promise.resolve = function (value) {
  return new _Promise(resolve => resolve(value))
}

_Promise.reject = function (error) {
  return new _Promise((_, reject) => reject(error))
}

_Promise.race = function () {

}

_Promise.all = function () {}

module.exports = _Promise

