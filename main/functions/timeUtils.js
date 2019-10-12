const _moment = require('moment-timezone');
const _regions = bot.settings.regions;

let timezones = _moment.tz
    .names()
    .filter(name => _regions.some(region => name.startsWith(`${region}/`)))
    .map(name => name.toLowerCase());

function findTimezone(timezone) {
    timezone = timezone
        .split(' ')
        .join('_')
        .toLowerCase();
    if (timezones.includes(timezone)) {
        return _moment.tz.zone(timezone);
    }

    let foundName = timezones.find(name => {
        return name.includes(timezone);
    });
    return _moment.tz.zone(foundName);
}

function getTimeInTimezone(timezone, format) {
    return _moment.tz(timezone).format(format);
}

function createTimeInTimezone(time, format, timezone) {
    return _moment.tz(time, format, timezone);
}

//REGEX UTILS
const TIME_REGEX = /\b([1-9]|1[0-2])(:\d{2})?\s*(a|p|am|pm)\b/i;

function containsTime(msg) {
    return TIME_REGEX.test(msg);
}

function matchTime(msg) {
    return TIME_REGEX.exec(msg);
}

module.exports = {
    findTimezone,
    getTimeInTimezone,
    createTimeInTimezone,
    containsTime,
    matchTime
};
