function bind (fn: Function, context, ...args) {
  return fn.apply(context, args)
}