# context-emitter [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges) #

A simple extension of node's
[`EventEmitter`](http://nodejs.org/api/events.html) that permits setting the
context of emitted events.

## Installation ##

``` bash
npm install context-emitter
```

## Usage ##

### `ContextEmitter = require('context-emitter')` ###

Returns the base class for the emitter.

### `emitter = new ContextEmitter([ctx])` ###

You can either extend a class with `ContextEmitter`, or instantiate it
directly. Either way, the first argument is optional and will set the context
to run event handlers from.

### `emitter.ctx = context` ###

Set the `ctx` property of the emitter to change emitted functions' contexts.
