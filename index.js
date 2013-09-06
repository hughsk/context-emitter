var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

module.exports = ContextEmitter

function ContextEmitter(ctx) {
  if (!(this instanceof ContextEmitter)) return new ContextEmitter(ctx)
  EventEmitter.call(this)
  this.ctx = arguments.length ? ctx : this
}
inherits(ContextEmitter, EventEmitter)

ContextEmitter.prototype.ctx = undefined
ContextEmitter.prototype.emit = function(type) {
  var len, args, i, listeners
  if (!this._events) this._events = {}

  var handler = this._events[type]
  if (typeof handler === 'undefined') return false
  if (typeof handler === 'function') {
    switch (arguments.length) {
      case 1: handler.call(this.ctx); break
      case 2: handler.call(this.ctx, arguments[1]); break
      case 3: handler.call(this.ctx, arguments[1], arguments[2]); break
      default:
        len = arguments.length
        args = new Array(len - 1)
        for (i = 1; i < len; i++) args[i - 1] = arguments[i]
        handler.apply(this.ctx, args)
    }
  } else
  if (Array.isArray(handler)) {
    len = arguments.length
    args = new Array(len - 1)
    for (i = 1; i < len; i++) args[i - 1] = arguments[i]
    listeners = handler.slice()
    len = listeners.length
    for (i = 0; i < len; i++) listeners[i].apply(this.ctx, args)
  }

  return true
}

ContextEmitter.prototype.once = function(type, listener) {
  if (typeof listener !== 'function')
    throw new Error('listener must be a function')

  var self = this
  function g() {
    self.removeListener(type, g)
    listener.apply(this, arguments)
  }

  g.listener = listener
  this.on(type, g)

  return this
}
