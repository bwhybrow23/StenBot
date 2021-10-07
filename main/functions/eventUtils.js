const fs = require("fs");
const Discord = require("discord.js");

//Functions to be used by the events and the event handler

//Comparing object keys (can be used to compare ids for example its used in member role add/remove)
const compare = (a1, a2) => {
  a1 = Array.from(a1.keys());
  a2 = Array.from(a2.keys());
  //Stole from internet
  let difference = a2
    .filter((x) => !a1.includes(x))
    .concat(a1.filter((x) => !a2.includes(x)));
  return difference;
};

//Check channel from channel id to see if it exists
var checkChannel = (id, client) => {
  let tchannel = client.channels.cache.get(id);
  if (tchannel === undefined) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  compare,
  checkChannel
};