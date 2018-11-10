const titleCase = require('./titleCase.ts')
console.log(titleCase)
module.exports = function is (obj: any, type: string): boolean {
  return Object.prototype.toString.call(obj) === `[object ${titleCase(type)}]`
}