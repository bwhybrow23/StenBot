var utils = require('./index.js')

console.log(util.snowflake(453763441732354058))

console.log([1,2,3,4,5].shuffle())

console.log(util.randColor())

console.log(util.randInt(1,5))

console.log(util.uptime())

console.log(util.osUptime())

console.log(util.capital('hello world'))

console.log(util.randAlphaNum(1))

console.log(util.round(2.482482, 4))

console.log(util.isNumber(3))

console.log(util.removeHtml('<h1>hello world<h1>'))

console.log(util.randItemFromArray(['2', 12, 'four']))

console.log(util.arrayTo(5))

console.log(util.isArray(['1','2','3','4', `5`])

utils.start()
console.log(utils.usage())

console.log(utils.hasNumber('1 two three four five')
