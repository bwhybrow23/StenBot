const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server').setDescription('Get information about a server')
        .addStringOption(option => option.setName('server').setDescription('The name of the server you want to get information about')),
    category: 'bot',
    usage: '[SERVER ID]',
    example: '455782308293771264',
    options: { permission: 'EVERYONE', aliases: ['server-info', 'serverinfo'], enabled: true, guildOnly: true },
    run: async (bot, interaction) => {

        const Discord = require('discord.js');

        let server = interaction.options.getString('server');
        let guild, id;

        //Check if there is a server argument
        if (!server) {
            guild = interaction.guild;
        } else {
            //String to integer
            try {
                id = parseInt(server);
            } catch (e) {
                bot.log.post('error', e);
            }
            //If no ID, output error
            if (!id) {
                return bot.createEmbed('error', '', 'Specified server ID is invalid. Please make sure that it is a valid server ID.', [], interaction.user.tag, interaction, true)
                    .then((embed) => interaction.reply({ embeds: embed }));
            }
            //Fetch server (from argument)
            try {
                guild = await bot.guilds.fetch(server, true, true);
            } catch (e) {
                return bot.createEmbed('error', '', 'Specified server cannot be found. Please make sure the bot is in the server.', [], interaction.user.tag, interaction, true)
                    .then((embed) => interaction.reply({ embeds: embed }));
            }
        }

        //Fetch members
        try {
            guild.members.fetch();
        } catch (e) {
            interaction.reply('An error occured.');
            return console.log(e);
        }

        //Fetch channels
        let txtChannelCount = 0;
        let vcChannelCount = 0;
        guild.channels.cache.forEach(channel => {
            if (channel.type === 'GUILD_TEXT') return txtChannelCount++;
            if (channel.type === 'GUILD_VOICE' || channel.type === 'GUILD_STAGE_VOICE') return vcChannelCount++;
        });

        //Final Embed
        let embed = new Discord.MessageEmbed()
            .setColor(bot.settings.color.blue)
            .setThumbnail(guild.iconURL())
            .addField('Name:', `${guild.name}`, true)
            .addField('Owner:', `${bot.users.cache.get(guild.ownerId).tag}`, true)
            .addField('ID:', `${guild.id}`, true)
            .addField('Text Channels:', `${txtChannelCount}`, true)
            .addField('Voice Channels:', `${vcChannelCount}`, true)
            .addField('Roles:', `${guild.roles.cache.size}`, true)
            .addField('Member Count:', `${guild.memberCount}`, true)
            .addField('Bot Count:', `${guild.members.cache.filter(member => member.user.bot).size}`, true)
            .setFooter({ text: 'Created' })
            .setTimestamp(guild.createdAt);

        return interaction.reply({ embeds: [embed.toJSON()] });

    }
};