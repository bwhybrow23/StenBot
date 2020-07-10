//OLD COMMAND HANDLER

// const args = message.content.slice(bot.settings.prefix.length).trim().split(/ +/g);
// const command = args.shift().toLowerCase();
// try {
//     let adminFile = require(`./commands/admin/${command}.js`);
//     adminFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToAdmin();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// };
// try {
//     let botFile = require(`./commands/bot/${command}.js`);
//     botFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToBot();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
// try {
//     let configFile = require(`./commands/config/${command}.js`);
//     configFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToConfig();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
// try {
//     let customFile = require(`./commands/custom/${command}.js`);
//     customFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToCustom();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
// try {
//     let ecoFile = require(`./commands/eco/${command}.js`);
//     ecoFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToEco();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
// try {
//     let funFile = require(`./commands/fun/${command}.js`);
//     funFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToFun();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
// try {
//     let generalFile = require(`./commands/general/${command}.js`);
//     generalFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToGeneral();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
// }
// try {
//     let modFile = require(`./commands/mod/${command}.js`);
//     modFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToMod();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
// try {
//     let ticketingFile = require(`./commands/ticketing/${command}.js`);
//     ticketingFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdToTicketing();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
// try {
//     let supportDiscordFile = require(`./commands/supportDiscord/${command}.js`)
//     supportDiscordFile.run(bot, message, args);

//     //Command-usage.json updates
//     addCmdToTotal();
//     addCmdTosupportDiscord();
// } catch (err) {
//     //Only enable these two for development puposes or else spam
//     //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
//     // console.log('[SYSTEM]'.grey, err);
// }
