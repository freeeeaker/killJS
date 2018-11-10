const util = require('./util')
const _Promise = require('./_Promise')
const assert = require('assert')

console.log(util.is([], 'array'))
console.log(util.is({}, 'object'))
console.log(util.is(1, 'number'))
console.log(util.is('1', 'string'))
console.log(util.is(function () {}, 'function'))
console.log(util.is(/s/, 'RegExp'))
console.log(util.is(new Date(), 'Date'))


var p = new _Promise(function (resolve, reject) {
  resolve(1)
})

p.then(value => {
  console.log('value:', value)
  return value + 1
}, error => {
  console.log('error1:', error)
}).then(value => {
  console.log('value:', value)
},(error => {
  console.log('error2:', error)
}))

p.then(value => value * 10).then(value => console.log('val:', value))