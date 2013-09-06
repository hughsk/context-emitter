var ContextEmitter = require('./index')
var test = require('tape')

test('Default context is this', function(t) {
  var emitter = new ContextEmitter

  t.plan(1)
  emitter.on('done', function() {
    t.equal(this, emitter)
  }).emit('done')
})

test('Can be overriden by setting ctx', function(t) {
  var emitter = new ContextEmitter
  var second = { hello: 'world' }

  t.plan(2)
  emitter.once('done', function() {
    emitter.ctx = second
    t.equal(this, emitter)
    emitter.once('done', function() {
      t.equal(this, second)
    }).emit('done')
  }).emit('done')
})

test('Can also be set as the first argument', function(t) {
  var ctx = { lorem: 'ipsum' }
  var emitter = new ContextEmitter(ctx)

  t.plan(2)
  t.equal(emitter.ctx, ctx)
  emitter.on('done', function() {
    t.equal(this, ctx)
  }).emit('done')
})
