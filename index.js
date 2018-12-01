const { TOKEN, DPREFIX, STENTORIAN } = require('./config');
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const db = require("quick.db");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

const serverStats = {
  guildID: '452032825311363072',
  ticketCategoryID: '515700623107293184'
}

//stuff for commands folder to work
fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
      console.log("Couldn't find commands.");
      return;
  }

  jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
  });
});

//welcome message
bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

  let welcomeChannel = member.guild.channels.find(`name`, "welcome-leave");
  if (!welcomeChannel) return console.log("Could not log a member joining as the server doesn't have a log channel!");
  let generalChannel = member.guild.channels.find(`name`, "general");
  if (!welcomeChannel) return generalChannel("Cannot log the member that has joined your server. Please create a channel called #welcome-leave. :smiley:");

  let welcomeEmbed = new  Discord.RichEmbed()
  .setDescription(`${member} has joined the server! Welcome :tada:`)
  .setFooter("User Joined")

  welcomeChannel.send(welcomeEmbed);
});

//leave message
bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} joined the server.`);

  let leaveChannel = member.guild.channels.find(`name`, "welcome-leave");
  if (!leaveChannel) return console.log("Could not log a member leaving as the server doesn't have a log channel!");
  let generalChannel = member.guild.channels.find(`name`, "general");
  if (!leaveChannel) return generalChannel("Cannot log the member that has left your server. Please create a channel called #welcome-leave. :smiley:");

  let leaveEmbed = new  Discord.RichEmbed()
  .setDescription(`${member.name} has left the server! Cya next time! :(`)
  .setFooter("User Left")

  leaveChannel.send(leaveEmbed);
});

//online message => console
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity('You | .help', { type: 'WATCHING' });
});

bot.on("message", async message => {
  if (message.author.bot) return;
  //disable DM
  if (message.channel.dm === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: DPREFIX
    };
  }

  //variables to work bot
  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
});

//TICKETS
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type !== 'text') {
      let active = await db.fetch(`ticket-${message.author.id}`);
      let guild = client.guilds.get(serverStats.guildID);
      let channel, found = true;
      try {
          if (active) client.channels.get(active.channelID)
              .guild;
      } catch (e) {
          found = false;
      }
      if (!active || !found) {
          active = {};
          channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`)
          channel.setParent(serverStats.ticketCategoryID)
          channel.setTopic(`/complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)

          channel.overwritePermissions("465147579517370368", { //Role id (when someone join my server get this role with id <<, i dont know how to change it for @everyone. This will prevent users to see the channel, only admins will see!
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
          });



          let author = message.author;
          const newChannel = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setAuthor(author.tag, author.avatarURL)
              .setFooter('Support Ticket Created!')
              .addField('User', author)
              .addField('ID', author.id)
          await channel.send(newChannel);
          const newTicket = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setAuthor(`Hello, ${author.username}`, author.avatarURL)
              .setFooter('Support Ticket Created!')
          await author.send(newTicket);
          active.channelID = channel.id;
          active.targetID = author.id;
      }
      channel = client.channels.get(active.channelID);
      const dm = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(`Thank you, ${message.author.username}`, message.author.avatarURL)
          .setFooter(`Your message has been sent - A staff member will be in contact soon.`)
      await message.author.send(dm);
      if (message.content.startsWith(prefix + 'complete')) return;
      const embed5 = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(message.content)
          .setFooter(`Message Received - ${message.author.tag}`)
      await channel.send(embed5);
      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      return;
  }
  let support = await db.fetch(`supportChannel_${message.channel.id}`);
  if (support) {
      support = await db.fetch(`support_${support}`);
      let supportUser = client.users.get(support.targetID);
      if (!supportUser) return message.channel.delete();
      if (message.content.toLowerCase() === '/complete') {
          const complete = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
              .setFooter('Ticket Closed -- Nebulous')
              .setDescription('*Your ticket has been marked as complete. If you wish to reopen it, or create a new one, please send a message to the bot.*')
          supportUser.send(complete);
          message.channel.delete();
          db.delete(`support_${support.targetID}`);
          let inEmbed = new Discord.RichEmbed()
              .setTitle('Ticket Closed!')
              .addField('Support User', `${supportUser.tag}`)
              .addField('Closer', message.author.tag)
              .setColor('RANDOM')
          const staffChannel = client.channels.get('453603092752236547'); //Create a log channel and put id here
          staffChannel.send(inEmbed);
      }
      const embed4 = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setFooter(`Message Received - Nebulous`)
          .setDescription(message.content)
      client.users.get(support.targetID)
          .send(embed4);
      message.delete({
          timeout: 10000
      });
      embed4.setFooter(`Message Sent -- ${supportUser.tag}`)
          .setDescription(message.content);
      return message.channel.send(embed4);
  }
});

//so it actually works
bot.login(TOKEN)
