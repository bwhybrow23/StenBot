var exports = module.exports = {};
var os = require('os')
const clockit = require('clockit');

/**
 * Creates a random integer within a given range
 * @param  {Int} min Start range
 * @param  {Int} max End range
 * @return {Int}     Random value within range
 */
exports.randInt = function(min, max) {
    return Math.floor(Math.random() * (max - min - 1)) + min;
}


/**
 * Credits to Cadence#3263
 * Shuffles an array psuedorandomly
 * @returns {Array} An array which has psuedorandomly shuffled
 */
Array.prototype.shuffle = function(){
  let old = [...this];
  let output = [];
  while (old.length) {
      let random = old.splice(Math.floor(Math.random()*old.length), 1)[0];
      output.push(random);
  }
  return output
}
/**
 * Creates a random hex colour
 * @return {Int} Random hex color code
 */
exports.randColor = function() {
  return Math.floor(Math.random() * 0x1000000)

}

/**
 * Grabs you your CPU Usage
 * @return {Int} CPU Usage as a decimal
 */
exports.start = function() {
  const timer = clockit.start();
  const startCpu = process.cpuUsage();
  return {
    usage() {
      const u = process.cpuUsage(startCpu);
      u.time = timer.us;
      u.percent = (u.system + u.user) / u.time * 100;
      return u;
    }
  };
}

/**
 * Geneates a uptime message for the system
 * @return {String} A human readable string of uptime
 */
exports.osUptime = function() {
  var msec = os.uptime().toFixed(0) * 1000;
  var days = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= days * 1000 * 60 * 60 * 24;
  var hours = Math.floor(msec / 1000 / 60 / 60);
  msec -= hours * 1000 * 60 * 60;
  var mins = Math.floor(msec / 1000 / 60);
  msec -= mins * 1000 * 60;
  var secs = Math.floor(msec / 1000);
  var timestr = "";
  if (days > 0) {
    timestr += days + " days ";
  }
  if (hours > 0) {
    timestr += hours + " hours ";
  }
  if (mins > 0) {
    timestr += mins + " minutes ";
  }
  if (secs > 0) {
    timestr += secs + " seconds";
  }
  return timestr
}

/**
 * Geneates a uptime message for the node process
 * @return {String} A human readable string of uptime
 */
exports.uptime = function() {
  var msec = process.uptime().toFixed(0) * 1000;
  var days = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= days * 1000 * 60 * 60 * 24;
  var hours = Math.floor(msec / 1000 / 60 / 60);
  msec -= hours * 1000 * 60 * 60;
  var mins = Math.floor(msec / 1000 / 60);
  msec -= mins * 1000 * 60;
  var secs = Math.floor(msec / 1000);
  var timestr = "";
  if (days > 0) {
    timestr += days + " days ";
  }
  if (hours > 0) {
    timestr += hours + " hours ";
  }
  if (mins > 0) {
    timestr += mins + " minutes ";
  }
  if (secs > 0) {
    timestr += secs + " seconds";
  }
  return timestr
}

/**
 * random alpha numberic number generation
 * @param  {Int} len Length of it
 * @return {String}     The resultant
 */
exports.randAlphaNum = function(len) {
  var rdmString = "";
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len);
}

/**
 * Round a number to set decimal places
 * @param  {Int} number       Number to be rounded
 * @param  {Int} decimalPlace How many decimal places
 * @return {Int}              Resultant value
 */
exports.round = function(number, decimalPlace) {
  return number.toFixed(decimalPlace)
}

/**
 * Checks if string is number
 * @param  {String} n Value to check
 * @return {Boolean}   If true or false
 */
exports.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Checks if string contains number
 * @param  {String} str Value to check
 * @return {Boolean}   If true or false
 */
exports.hasNumber = function(str) {
  return /\d/.test(str);
}
exports.snowflake = function(snowflake){
  return new Date((snowflake*Math.pow(2, -22)) + 1420070400000).toUTCString()
}
/**
 * Converts html tags to exscaped form
 * @param  {String} text Text to escape
 * @return {[type]}      [description]
 */
exports.escapeHtml = function(text) {
  var replacements = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;"
  };
  return text.replace(/[<>&"]/g, function(character) {
    return replacements[character];
  });
}

/**
 * Gets a random element from an array
 * @param  {Array} array Array to have value choosen
 * @return {Member}       Resultant selection
 */
exports.randItemFromArray = function(array) {
  return array[this.randInt(0,array.length)];
}

/**
 * Initialize array of given length
 * @type {Boolean} how many values to be inside
 * @return {Array} the array
 */
exports.arrayTo = function(max) {
  return new Array(max);
}

/**
 * Checks if value is array
 * @param  {Something} obj Cause no one knows if this variable is an array or not
 * @return {Boolean}     Stetment
 */
exports.isArray = function(obj) {
  return Array.isArray(obj);
}
