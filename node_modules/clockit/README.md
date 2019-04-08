[![npm](https://img.shields.io/npm/v/clockit.svg)](https://www.npmjs.com/package/clockit)

# clockit
Simple high resolution timer for node

Wraps [process.hrtime()](https://nodejs.org/api/process.html#process_process_hrtime_time) 
in a simple to use interface.
No need to multiply and divide to get desired measurement units.

Timer precision is a nanosecond.

***Note:** requires Node.js 4 or later.

## Install

```sh
npm install --save clockit
```

## Usage

```js
const clockit = require('clockit');

var timer = clockit.start();
// ...
var ms = timer.ms; // time passed in milliseconds
var us = timer.us; // time passed in microseconds
var ns = timer.ns; // time passed in nanoseconds
```

Since time is measured in nanoseconds, `ns` returns an integer while
`us` and `ms` return floating point numbers without rounding.

These timer properties return the elapsed time since the `start()` call.
This means that two consecuritve reads of `ns` for example will
return different values taking into account the time between the two calls.
