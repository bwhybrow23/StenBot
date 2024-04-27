/* eslint-disable no-unused-vars */
const playerReport = (bot, reObj, rObj, gObj, reason, evidence, rDate) => {
  import Discord from 'discord.js';
  
  return new Promise((resolve, reject) => {
  
    /* Passed Objects
         - reObj - Object of the person reporting
         - rObj - Object of the person reported
         - gObj - Object of the guild
         - reason - Reason for the report
         - evidence - Any provided evidence
         - rDate - Date of the report
      */
  
    //Parse into embed
    let playerEmbed = new Discord.EmbedBuilder()
      .setColor(bot.settings.color.yellow)
      .setTitle('New Player Report')
      .addFields([ { name: 'Reporter Information', value: `Username: ${reObj.tag}\nUser ID: ${reObj.id}\nFrom Server ID: ${gObj.id}\nDate Reported: ${rDate}` }, { name: 'Reported Information', value: `User: ${rObj}\nUser ID: ${rObj.id}` }, { name: 'Report Information', value: `Reason: ${reason}\nEvidence: ${evidence}` } ])
      .setTimestamp();
  
    //Resolve Embed
    resolve(playerEmbed);
  
  });
};
  
const serverReport = (bot, reObj, gObj, reason, evidence, rDate) => {
  import Discord from 'discord.js';
  
  return new Promise((resolve, reject) => {
  
    /* Passed Objects
         - reObj - Object of the person reporting
         - gObj - Object of the guild reported
         - reason - Reason for the report
         - evidence - Any provided evidence
         - rDate - Date of the report
      */
  
    //Parse into embed
    let serverEmbed = new Discord.EmbedBuilder()
      .setColor(bot.settings.color.yellow)
      .setTitle('New Server Report')
      .addFields([ { name: 'Reporter Information', value: `Username: ${reObj.tag}\nUser ID: ${reObj.id}\nDate Reported: ${rDate}` }, { name: 'Server Information', value: `Name: ${gObj.name}\nID: ${gObj.id}` }, { name: 'Report Information', value: `Reason: ${reason}\nEvidence: ${evidence}` } ])
      .setTimestamp();
  
    //Resolve Embed
    resolve(serverEmbed);
  
  });
};
  
const bugReport = (bot, reObj, gObj, info, steps, evidence, rDate) => {
  import Discord from 'discord.js';
  
  return new Promise((resolve, reject) => {
  
    /* Passed Objects
         - reObj - Object of the person reporting
         - gObj - Object of the guild from the person reporting
         - info - Short info about the bug
         - steps - Steps to recreate bug
         - evidence - Any provided evidence
         - rDate - Date of the report
      */
  
    //Parse into embed
    let bugEmbed = new Discord.EmbedBuilder()
      .setColor(bot.settings.color.yellow)
      .setTitle('New Bug Report')
      .addFields([ { name: 'Reporter Information', value: `Username: ${reObj.tag}\nUser ID: ${reObj.id}\nFrom Server: ${gObj.name}\nDate Reported: ${rDate}` }, { name: 'Bug Information', value: `Info: ${info}\nSteps to Reproduce: ${steps}\nEvidence: ${evidence}` } ])
      .setTimestamp();
  
    //Resolve Embed
    resolve(bugEmbed);
  
  });
};
  
module.exports = {
  playerReport,
  serverReport,
  bugReport
};