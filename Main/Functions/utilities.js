/**
 * 
 * General Utilities used throughout the application that don't fit into a specific category
 * 
 */

//Dependencies

/**
 * Check if a user has a specific permission
 * @param {Object} interaction Interaction object from Discord API
 * @param {string} permission Permission to check for (in caps)
 * @param {Object} bot Bot object
 * @returns 
 */
const permissionCheck = async (interaction, permission, bot) => {
  return new Promise((resolve) => {
    if (interaction.member.permissions.has(permission) === false) {
      bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
      return resolve(false);
    }
    resolve(true);
  });
};

  
//Export Functions
export default {
  permissionCheck
};