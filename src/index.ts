import _Promise from './_Promise'
import AsyncQueue from './AsyncQueue'
import EventEmitter from './EventEmitter'

const asyncQueue = new AsyncQueue()

for (let i = 0; i < 5; i++) {
  asyncQueue.push(function (next) {
    setTimeout(function () {
      console.log(i)
      next()
    }, 1000)
  })
}

asyncQueue.run()

const event = new EventEmitter()

event.on('do', console.log)
event.once('do', console.log)
event.on('do', console.log)


event.emit('do', 'hhhh')

event.emit('do', 'xxxx')

event.emit('do', 'xxxx')

event.off('do', console.log)
event.emit('do', 'zzz')


// const util = require('./util')
// const assert = require('assert')

// console.log(util.is([], 'array'))
// console.log(util.is({}, 'object'))
// console.log(util.is(1, 'number'))
// console.log(util.is('1', 'string'))
// console.log(util.is(function () {}, 'function'))
// console.log(util.is(/s/, 'RegExp'))
// console.log(util.is(new Date(), 'Date'))

// var p1 = new _Promise(function (resolve, reject) {
//   resolve(1)
// })
// p1.then(value => {
//   console.log('p1:', value)
// })

// var p2 = new _Promise((resolve, reject) => {
//   setTimeout(() => resolve(2), 1000)
// })

// p2.then(value => {
//   console.log('p2:', value)
//   return value + 10
// }).then(value => {
//   console.log('p2-1:', value)
// })

// var p3 = new _Promise(function (resolve, reject) {
//   reject(1)
// })
// p3.then(null, reject => {
//   console.log('reject:', reject)
// })

// var p4 = new _Promise(resolve => {
//   setTimeout(() => {
//     resolve(1)
//   },  1000)
// })

// var p5 = new _Promise(resolve => {
//   setTimeout(() => {
//     resolve(2)
//   },  2000)
// })

// _Promise.race(p4, p5).then(val => {
//   console.log('race:', val)
// })

// _Promise.all(p4, p5).then(val => {
//   console.log('all:', val)
// })