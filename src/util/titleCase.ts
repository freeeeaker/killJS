module.exports = function titleCase (str: string): string {
  return str.replace(/^[a-z]/, s => s.toUpperCase())
}