const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder").setDescription("Manage StenBot reminders")
    .addSubcommand(subcommand => subcommand.setName("add").setDescription("Add a reminder")
      .addStringOption(option => option.setName("time").setDescription("The time to set the reminder for. (e.g. 5m, 6h, 10y)").setRequired(true))
      .addStringOption(option => option.setName("message").setDescription("The message to send").setRequired(true))
      .addStringOption(option => option.setName("reocurring-time").setDescription("If reoccuring, what intervals shall it do it at? (e.g. 1h, 2d, 3w)")))
    .addSubcommand(subcommand => subcommand.setName("remove").setDescription("Remove a reminder")
      .addIntegerOption(option => option.setName("id").setDescription("The ID of the reminder to remove").setRequired(true)))
    .addSubcommand(subcommand => subcommand.setName("list").setDescription("List all reminders")),
  category: "general",
  usage: "<SUBCOMMAND> [ARGS]",
  example: "list",
  options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: true },
  run: async (bot, interaction) => {
    
    const Timeout = require("../../Main/Models/timeouts");
    const moment = require("moment");
    const ms = require("ms");
    
    //Capitalize function
    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    
    let command = "reminder";
    let user = interaction.user.id;
    let reminders;
    
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "list":
    
        reminders = await Timeout.find({
          user,
          command
        });
    
        let listEmbed = {
          "title": `${interaction.user.tag}'s Reminders`,
          "description": "Here is a list of all your reminders, including reoccuring ones.",
          "color": bot.settings.color.yellow,
          "fields": [],
          "footer": {
            "icon_url": interaction.user.avatarURL(),
            "text": "StenBot Reminders"
          }
        }
    
        await reminders.forEach(async (reminder, i) => {
          let data = {
            name: `ID: ${i+1} | ${reminder.message}`,
            value: `**Expiry:** ${moment(moment.unix(reminder.expires)).format("H:mm DD/MM/YYYY z")} \n**Reoccuring:** ${reminder.reoccuring ? "Yes" : "No"}`
          }
          if (reminder.reoccuring === true) {
            data.value += `\n**Reoccurs Every:** ${capitalize(moment.duration(reminder.reoccuringPeriod).humanize())}`
          }
          listEmbed.fields.push(data);
        });
    
        if (reminders.length === 0) {
          interaction.reply("You do not currently have any ongoing reminders.");
        } else {
          interaction.reply({
            embeds: [listEmbed]
          })
        }
    
        break;
    
      case "add":
    
        /**
         * Usage: /reminder add <TIME> <MESSAGE> <REOCCURING TIME>
         */
    
        let time;
        let rMessage;
        let reoccuring = false;
        let reoccuringPeriod;
    
        //Check if reoccuring
        if (interaction.options.getString("reocurring-time")) {
          reoccuring = true;
          reoccuringPeriod = ms(interaction.options.getString("reoccuring-time"));
    
          time = ms(interaction.options.getString("time"));
          rMessage = interaction.options.getString("message");
        } else {
          time = ms(interaction.options.getString("time"));
          rMessage = interaction.options.getString("message");
        }
    
        //Check if user can be DM'd
    
          //Send reply in guild
          interaction.reply("I am going to DM you to check you have open DMs. Please ignore the message.");
    
          //Try to send user a DM
          try {
            interaction.user.send("Just checking to see if I can message you :)");
          } catch (error) {
            //Error message to user
            return interaction.reply("I'm afraid there was an issue when I tried to DM you. Please make sure your DMs are open and try again. If they are open and you still get issues. Please use `/invite` for the link to the support server.");
          }

    
        // Do the stuffs
        bot.timeouts.new(interaction.user.id, "reminder", time, reoccuring, reoccuringPeriod, rinteraction);
    
        //User output
        let addEmbed = {
          "title": `Reminder successfully created!`,
          "color": bot.settings.color.green,
          "fields": [{
              "name": "Time:",
              "value": capitalize(moment.duration(time).humanize())
            },
            {
              "name": "Message:",
              "value": rMessage
            },
            {
              "name": "Reoccuring:",
              "value": reoccuring ? "Yes" : "No"
            }
          ],
          "footer": {
            "icon_url": interaction.user.avatarURL(),
            "text": "StenBot Reminders"
          }
        }
        if (reoccuring === true) {
          addEmbed.fields.push({
            "name": "Reoccuring Period",
            "value": capitalize(moment.duration(reoccuringPeriod).humanize())
          })
        }
    
        interaction.reply({
          embeds: [addEmbed]
        });
    
        break;
    
      case "remove":
    
        /**
         * Usage: /reminders remove <ID>
         */
    
        reminders = await Timeout.find({
          user,
          command
        });
        if (reminders.length === 0) {
          interaction.reply("You do not currently have any ongoing reminders.");
        }
    
        //Fetch ID from message
        let wantedReminder;
        try {
          wantedReminder = interaction.options.getInteger("id") - 1;
        } catch (error) {
          return interaction.reply("Not a valid number.");
        }
    
        let reminder = reminders[wantedReminder];
        await bot.timeouts.removeSync(reminder._id)
          .then(() => {
            return interaction.reply(`Reminder ID ${wantedReminder + 1} has been successfully deleted.`);
          })
          .catch((error) => {
            interaction.reply("An error has occured. Please retry and/or contact Stentorian if the issue persists.")
            return bot.log.post("error", error);
          })
    
        break;
    
      default:
        return bot.helpEmbed("reminder", bot)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post("error", error));
    
        break;
    }
  },
};