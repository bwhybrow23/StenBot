const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("api").setDescription("Generate an API token to use at https://sb.benwhybrow.com/api"),
    category: "bot",
    options: { permission: "EVERYONE", enabled: true, cooldown: 60, guildOnly: false },
    run: async (bot, interaction) => {
  
      //Create the token in the database
      bot.mutils.createUser(interaction.user.id).then(authToken => {
        //Send the token to the user
        bot.createEmbed("success", "API Information", "Use the below token to connect to the [StenBot API](https://benwhybrow.com/api). It will be used a form of authentication to check that you can perform an action.", [{
          name: "API Token:",
          value: `||**${authToken}**||`
        }], interaction.user.tag, interaction).then(embed => interaction.user.send(embed));

        //Reply to the slash command
        return interaction.reply({ content: "I have sent you a DM with your API token.", ephemeral: true });

      });
  
    }
  };