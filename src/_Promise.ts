const empty = x => x

class _Promise {

  status: string
  resolveFnArray: Array<Function>
  rejectFnArray: Array<Function>
  _value: any
  _error: Error

  constructor (fn: (resolve, reject) => void) {
    if (!((this as any) instanceof _Promise)) {
      return new _Promise(fn)
    }
    this.status = 'initial'
    this.resolveFnArray = []
    this.rejectFnArray = []
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve (value) {
    if (this.status !== 'initial') return
    this.status = 'resolved'
    this._value = value
    this.resolveFnArray.forEach(fn => {
      try {
        fn(value)
      } catch (err) {

      }
    })
  }
  
  reject (error) {
    if (this.status !== 'initial') return
    this.status = 'rejected'
    this._error = error
    this.rejectFnArray.forEach(fn => fn(error))
  }
  
  then (resolveFn, rejectFn = empty) {
    if (this.status === 'initial') {
      const event = {
        events: {},
        one: function (name, fn) {
          this.events[name] = value => {
            fn(value)
            delete this.events[name]
          }
        },
        emit: function (name, value) {
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
    return _Promise.resolve(rejectFn(this._error))
  }
  
  catch (fn) {
    
  }
  static resolve (value) {
    return new _Promise(resolve => resolve(value))
  }
  
  static reject (error) {
    return new _Promise((_, reject) => reject(error))
  }
  
  static race = function (...promises: Array<_Promise>): _Promise {
    const event = {
      events: {},
      one: function (name, fn) {
        this.events[name] = value => {
          fn(value)
          delete this.events[name]
        }
      },
      emit: function (name, value) {
        this.events[name](value)
      }
    }
    const nextPromise = new _Promise(resolve => {
      event.one('resolve', resolve)
    }) 
    promises.forEach(p => {
      p.then(value => {
        event.emit('resolve', value)
      })
    })
    return nextPromise
  }
  
  static all = function (...promises: Array<_Promise>): _Promise {
    const results = []
    const event = {
      events: {},
      one: function (name, fn) {
        this.events[name] = value => {
          fn(value)
          delete this.events[name]
        }
      },
      emit: function (name, value) {
        this.events[name](value)
      }
    }
    const nextPromise = new _Promise(resolve => {
      event.one('resolve', resolve)
    }) 
    promises.forEach((item) => {
      item.then(value => {
        // event.emit('resove', value)
        results.push(value)
        if (results.length === promises.length) {
          event.emit('resolve', [...results])
        }
      })
    })
    return nextPromise
  }
}

export default _Promise
