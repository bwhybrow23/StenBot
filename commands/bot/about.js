module.exports = {
  name: "about",
  category: "bot",
  description: "Gives some information about StenBot.",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", enabled: true, guildOnly: false },
  run: async (bot, message) => {

      return message.channel.send({embed: {
        title: "Bot Information", 
        color: bot.settings.color.blue,
        thumbnail: bot.user.displayAvatarURL(),
        fields: [{
          name: "Bot Name",
          value: `${bot.user.tag}`
        }, {
          name: "Founded By",
          value: "Ben Whybrow (Stentorian#9524)"
        }, {
          name: "Created On",
          value: `${bot.user.createdAt}`
        }, {
          name: "Credit",
          value: `- <@285447788827770881> - Original Code & Occasional Help \n- <@236379670961061889> - Dealing with my code errors in his DMs`
        },
        {
          name: "Why was StenBot Created?",
          // value: "It was mainly created to save me from the pain of creating multiple bots for clients. I also don't like some of the features that are included with major Discord bots. It started as a copy and paste bot that i was going to publish \"Open Source\" on Github. Then I recieved some help from a friend called Samb8104 who gave me some old code from a bot he was working on and I was able to add per server configs and cool features that you're seeing today!",
          value: "StenBot was originally created with the idea in mind of reducing the amount of Discord bots every server needs. It was also to take the stress off making so many Discord bots for friends and just giving them this bot instead. It contains a plethra of features and more to come in the future with consistent updates."
        }],
        footer: {
          icon_url: bot.user.displayAvatarURL(),
          text: message.server.name
        }
      }})

  }
};