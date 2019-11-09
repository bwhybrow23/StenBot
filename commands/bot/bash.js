module.exports = {
    name: "bash",
    category: "bot",
    description: "Runs bash commands from within the bot.",
    example: ".bash echo StenBot is cool",
    permission: "BOT OWNER",
    run: async (bot, message, args) => {

    const Discord = require(`discord.js`);
    
    if(message.author.id !== bot.settings.ids.botOwner) {message.reply("You do not have permission to do this command.")}
    const exec = require('child_process').exec;
    var StartTime=Date.now();
    let msg = await message.channel.send('Getting results...')
    exec(args.join(' '),{},(error,stdout,stderr)=>{var Embed=new Discord.RichEmbed();
    Embed.setTitle('Bash Results')
    .addField('Input',args.join(' '),true)
    .addField('ExecTime',(Date.now()-StartTime)+'ms',true)
    .addField('Errors',error?error:'None',true)
    .addField('stdout',stdout?stdout:'None')
    .addField('stderr',stderr?stderr:'None');
    msg.edit(Embed);});
    
}};
