/* eslint-disable no-unused-vars */
const playerReport = (bot, reObj, rObj, gObj, reason, evidence, rDate) => {
    const Discord = require('discord.js');
  
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
        let playerEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.color.yellow)
            .setTitle('New Player Report')
            .addField('Reporter Information', `Username: ${reObj.tag}\nUser ID: ${reObj.id}\nFrom Server ID: ${gObj.id}\nDate Reported: ${rDate}`)
            .addField('Reported Information', `User: ${rObj}\nUser ID: ${rObj.id}`)
            .addField('Report Information', `Reason: ${reason}\nEvidence: ${evidence}`)
            .setTimestamp();
  
        //Resolve Embed
        resolve(playerEmbed);
  
    });
};
  
const serverReport = (bot, reObj, gObj, reason, evidence, rDate) => {
    const Discord = require('discord.js');
  
    return new Promise((resolve, reject) => {
  
        /* Passed Objects
         - reObj - Object of the person reporting
         - gObj - Object of the guild reported
         - reason - Reason for the report
         - evidence - Any provided evidence
         - rDate - Date of the report
      */
  
        //Parse into embed
        let serverEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.color.yellow)
            .setTitle('New Server Report')
            .addField('Reporter Information', `Username: ${reObj.tag}\nUser ID: ${reObj.id}\nDate Reported: ${rDate}`)
            .addField('Server Information', `Name: ${gObj.name}\nID: ${gObj.id}`)
            .addField('Report Information', `Reason: ${reason}\nEvidence: ${evidence}`)
            .setTimestamp();
  
        //Resolve Embed
        resolve(serverEmbed);
  
    });
};
  
const bugReport = (bot, reObj, gObj, info, steps, evidence, rDate) => {
    const Discord = require('discord.js');
  
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
        let bugEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.color.yellow)
            .setTitle('New Bug Report')
            .addField('Reporter Information', `Username: ${reObj.tag}\nUser ID: ${reObj.id}\nFrom Server: ${gObj.name}\nDate Reported: ${rDate}`)
            .addField('Bug Information', `Info: ${info}\nSteps to Reproduce: ${steps}\nEvidence: ${evidence}`)
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