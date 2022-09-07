/* eslint-disable no-case-declarations */
const { SlashCommandBuilder } = require('@discordjs/builders');
const userUtils = require('../../Main/Functions/userUtils');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('image').setDescription('View/Manage your image storage. (15s cooldown)')
    .addSubcommand(subCommand => 
      subCommand.setName('add').setDescription('Add an image to your gallery. (ToS Compliant)')
        .addStringOption(option => option.setName('name').setDescription('The name of the image to be stored').setRequired(true))
        .addAttachmentOption(option => option.setName('image').setDescription('The image you\'d like to add').setRequired(true))
    )
    .addSubcommand(subCommand => 
      subCommand.setName('remove').setDescription('Remove an image from your gallery.')
        .addStringOption(option => option.setName('name').setDescription('The name of the image you\'d like to delete.').setRequired(true))
    )
    .addSubcommand(subCommand => 
      subCommand.setName('view').setDescription('View the images in your gallery.')
        .addStringOption(option => option.setName('name').setDescription('The name of the image you\'d like to view.'))
    ),
  category: 'fun',
  usage: '<SUBCOMMAND> [ACTION]',
  example: 'view steveharvey',
  description: 'View/Manage your image storage.',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 15, guildOnly: false },
  run: async (bot, interaction) => {

    //Global variables
    let name;
    let image;
    let user;

    //Function to check if image
    function isImage(url) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    //Switch statement for subcommands
    switch (interaction.options.getSubcommand()) {
    case 'add':
        
      //Get values from command
      name = interaction.options.getString('name');
      image = interaction.options.getAttachment('image');

      //Check if attachment is a video, if so, don't save
      if(isImage(image.url) === false) return interaction.reply({ content: 'Please only upload images/GIFs.', ephemeral: true });

      //Get user from DB
      user = await userUtils.getUser(interaction.user.id);
      if(!user) return interaction.reply({ content: 'I cannot find you on the database.', ephemeral: true});

      //Upload image to imgbb
      let res;
      let params = new URLSearchParams();
      params.append('image', image.url);
      await fetch(`https://api.imgbb.com/1/upload?key=${bot.settings.connections.imgbb}`, {
        method: 'POST',
        body: params
      })
        .then(res => res.json())
        .then(json => res = json);

      //Turn data into object
      let data = {
        url: res.data.imageURL,
        name: name,
        serverId: interaction.guild.id,
        imageDeleteURL: res.data.imageDeleteURL
      };

      //Verification Embed to StenBot Discord
      let newimageEmbed = new Discord.EmbedBuilder()
        .setColor('4500FF')
        .setTitle('New image uploaded!')
        .setDescription('Please check the below image is compliant with Discord\'s ToS. If not, please contact Stentorian so he can remove it.')
        .addFields([
          {
            name: 'Submitted by:',
            value: interaction.user.tag
          },
          {
            name: 'Image name:',
            value: name
          },
          {
            name: 'Image URL',
            value: res.data.imageURL
          },
          {
            name: 'Image Delete URL',
            value: res.data.imageDeleteURL
          }
        ])
        .setImage(res.data.imageURL)
        .setTimestamp();

      await bot.channels.cache.get('1013225940056285229').send({ embeds: [ newimageEmbed ]});

      //If no images array, create it 
      if(!user.images) user.images = [];
      
      //Push changes to DB
      user.images.push(data);
      await userUtils.updateUser(interaction.user.id, user);

      //Confirmation to user
      let confirmationEmbed = new Discord.EmbedBuilder()
        .setColor(bot.settings.color.green)
        .setTitle('Image added to gallery!')
        .setDescription('Hi there! Thank you for submitting your image to your gallery. You can now use it by running the command `/image view NAME`, replacing `NAME` with the custom name you chose.\n\n**Disclaimer:** StenBot is not responsible for the content uploaded to the gallery. An image can be removed at any time without notification to the user. Please ensure you follow Discord\'s Terms of Service when using StenBot.\n\n**PLEASE NOTE:** StenBot\'s gallery system relies on the original image being available at all times. If the original image is removed, so will your gallery entry.');

      interaction.reply({ embeds: [ confirmationEmbed ], ephemeral: true });

      break;

    case 'remove':

      //Get variables
      name = interaction.options.getString('name');

      //Get user from DB
      user = await userUtils.getUser(interaction.user.id);
      if(!user) return interaction.reply({ content: 'I cannot find you on the database.', ephemeral: true});

      //Check if image exists
      let imageData = user.images.find(image => image.name.toLowerCase() === name.toLowerCase());
      if(!imageData) return interaction.reply({ content: 'I cannot find that image in your gallery.', ephemeral: true });
      let imageDeleteURL = imageData.imageDeleteURL;

      //Find and remove object from array
      user.images.splice(user.images.findIndex(image => image.name === name), 1);
      
      //Save to DB
      await userUtils.updateUser(interaction.user.id, user);

      //Confirmation to user
      let deletedEmbed = new Discord.EmbedBuilder()
        .setColor(bot.settings.color.green)
        .setTitle('Your image has been deleted!')
        .setDescription(`Your image has now been succesfully removed from StenBot's gallery. Please keep in mind that this does not remove the original image. To do this, please visit ${imageDeleteURL} and click "Delete"`);

      interaction.reply({ embeds: [ deletedEmbed ], ephemeral: true });

      break;
    
    case 'view':

      //Get user from DB
      user = await userUtils.getUser(interaction.user.id);
      if(!user) return interaction.reply({ content: 'I cannot find you on the database.', ephemeral: true});

      //If image is provided, show image
      if(interaction.options.getString('name') != undefined || null) {

        //Variables
        name = interaction.options.getString('name');

        //Find image
        let imageObj = user.images.filter((image) => image.name === name);
        if(!imageObj[0]) return interaction.reply({ content: 'I cannot find this image in your gallery. Please ensure you used the correct name.'});

        //Construct embed
        let imageEmbed = new Discord.EmbedBuilder()
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
          .setImage(imageObj[0].url)
          .setFooter({ text: 'StenBot is not responsible for the content of the above displayed image. Please report any ToS violations to [Discord](https://dis.gd/report).' });

        //Send embed
        return interaction.reply({ embeds: [ imageEmbed ] });

      } else {

        //Check if any images
        try {
          let image = user.images[0];
          // eslint-disable-next-line no-unused-vars
          image = null;
        } catch (error) {
          return interaction.reply({ content: 'You don\'t have any saved images on your gallery.', ephemeral: true });
        }

        //Construct embed
        let imageList = [];
        await user.images.forEach((image) => {
          imageList.push(`**${image.name}** » ${image.url}`);
        });

        //Split arrays to every N amount
        let n = 10;
        let result = new Array(Math.ceil(imageList.length / n))
          .fill()
          // eslint-disable-next-line no-unused-vars
          .map(_ => imageList.splice(0, n));

        let page = 1;
        result.forEach((array) => {
          bot.createEmbed('info', '**Image List**', '', [{
            name: 'Images',
            value: `${array.join('\n')}`
          }], `Page ${page}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
          page++;
        });

      }

      break;

    default:

      interaction.reply({ content: 'This command requires a subcommand.', ephemeral: true });

      break;
    }

  }
};