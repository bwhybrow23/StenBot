<p align="center"> 
<img src="https://axelgreavette.js.org/img/portfolio/botutils.png">
</p>

# Bot-Utils
[![NPM](https://nodei.co/npm/bot-utils.png?)](https://nodei.co/npm/bot-utils/) 

[![npm version](https://badge.fury.io/js/bot-utils.svg)](https://badge.fury.io/js/bot-utils)

Easy to use utilities for JavaScript written Discord bots. Or you can use them any Javascript program...
## Documentation
| Method | Description |
|--|--|
| `.shuffle(array)` | Shuffles the given `array` |
|`.snowflake(snowflake)`| Date of given `snowflake` |
|`randColor()`| Returns a random `0x` prefixed Hex colour code |
|`.randInt(min, max)`| Returns a random integer from a range of `mid` to `max` |
|`.uptime()` |  Returns process uptime |
|`.osUptime()` | Returns system uptime |
| `.capital(string)` | Returns the `string` with the first letter capitalized |
| `.randAlphaNum(len)` | Returns a random alphanumeric |
| `.round(number, decimal-place)` | Returns a the given `number` rounded to the given  `decimal-place` | 
| `.isNumber(input)` | Checks if `input` is a number | 
| `.hasNumber(input)` | Checks if `input` contains a number |
|`.escapeHtml(string)` | Escapes HTML in the given `string`|
| `.randItemFromArray(array)` | Picks a random item from the given `array`|
|`.arrayTo(number)`| Creates an empty array with `number` as the amount of entries |
|`.isArray(array)` | Checks if `array` is in fact, and array |
|`.start()` | Start the CPU monitor |
|`.usage()` | Returns the CPU usage for the time when it was called |
## Usage Examples

```js
var util = require('bot-utils')

console.log(util.snowflake(453763441732354058))
//Wed, 06 Jun 2018 03:33:55 GMT
console.log([1,2,3,4,5].shuffle())
//[4,5,1,2,3]
console.log(util.randColor())
//0x140131
console.log(util.randInt(1,5))
//4
console.log(util.uptime())
//1 day, 12 minutes and 10 seconds
console.log(util.osUptime())
//12 days 14 minutes 1 second
console.log(util.capital('hello world'))
//Hello world
console.log(util.randAlphaNum(1))
//5
console.log(util.round(2.482482, 4))
//2.4824
console.log(util.isNumber(3))
//true
console.log(util.removeHtml('<h1>hello world<h1>'))
//hello world
console.log(util.randItemFromArray(['2', 12, 'four']))
//12
console.log(util.arrayTo(5))
//[1,2,3,4,5]
console.log(util.isArray(['1','2','3','4', `5`])
//true
utils.start()
console.log(utils.usage())
//4.249294924924
console.log(utils.hasNumber('1 two three four five')
//true
```
