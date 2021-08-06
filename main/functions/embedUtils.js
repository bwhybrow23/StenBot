const colours = {
  red: 14165566,
  green: 1295876,
  yellow: 14672927,
  blue: 4886754,
};

const createEmbed = (type, title, desc, fields, footer, message) => {
  return new Promise((resolve, reject) => {

      let embedTemplate = {
          embeds: [{
              title: "",
              description: "",
              color: 0,
              // timestamp: Date.now(),
              footer: {
                  icon_url: "https://i.imgur.com/BkZY6H8.png",
                  text: ``,
              },
              fields: [],
          }, ]
      };

      //Colour
      switch (type) {
          case "error":
              embedTemplate.embeds[0].color = colours.red;
              break;
          case "success":
              embedTemplate.embeds[0].color = colours.green;
              break;
          case "warning":
              embedTemplate.embeds[0].color = colours.yellow;
              break;
          case "info":
              embedTemplate.embeds[0].color = colours.blue;
              break;
          default:
              reject("Invald embed type.");
      }
      //Title
      if (typeof title == "string" && title.length < 256) {
          embedTemplate.embeds[0].title = title;
      } else {
          reject("Title is invalid.");
      }
      //Desc
      if (typeof desc == "string" && desc.length < 2048) {
          embedTemplate.embeds[0].description = desc;
      } else {
          reject("Description is invalid.");
      }
      //Footer
      if (typeof footer == "string" && footer.length < 2048) {
          if (footer == message.guild.name) {
              embedTemplate.embeds[0].footer.icon_url = message.guild.iconURL();
          } else if (footer == message.author.tag) {
              embedTemplate.embeds[0].footer.icon_url = message.author.displayAvatarURL();
          }
          embedTemplate.embeds[0].footer.text = footer;
      } else {
          embedTemplate.embeds[0].footer.icon_url = "";
      }
      //Fields
      fields.forEach((field) => {
          if (field.name.length < 256) {
              if (field.value.length < 1024) {
                  embedTemplate.embeds[0].fields.push(field);
              } else {
                  reject("A field has a value that is too large.");
              }
          } else {
              reject("A field has a name that is too large.");
          }
      });
      //Footer icon
      // embedTemplate.footer.icon_url = bot.user.displayAvatarURL()
      resolve(embedTemplate);
  });
};

const noPermsEmbed = (footer, bot) => {
  return new Promise((resolve, reject) => {

      let embedTemplate = {
          embeds: [{
              title: "",
              description: "",
              color: 0,
              timestamp: Date.now(),
              footer: {
                  icon_url: "https://i.imgur.com/BkZY6H8.png",
                  text: ``,
              },
              fields: [],
          }, ]
      };

      //Color
      embedTemplate.embeds[0].color = colours.red;
      //Desc
      embedTemplate.embeds[0].description = `Error! You do not have permission to issue this command!`;
      //Footer
      if (typeof footer == "string" && footer.length < 2048) {
          embedTemplate.embeds[0].footer.text = footer;
      } else {
          reject("Footer is invalid.");
      }

      resolve(embedTemplate);
  });
};

const helpEmbed = (command, bot) => {
  return new Promise((resolve, reject) => {
      //Capitalize function
      const capitalize = (s) => {
          if (typeof s !== "string") return "";
          return s.charAt(0).toUpperCase() + s.slice(1);
      };

      //Get command info
      let cmd;
      if (bot.aliases.get(command.toLowerCase()) == undefined) {
          cmd = bot.commands.get(command.toLowerCase())
      } else {
          cmd = bot.commands.get(bot.aliases.get(command.toLowerCase()));
      }
      if (!cmd) {
          reject(`Cannot find command under the name of ${command}`);
      }

      if (cmd.category == "botowner") return;

      //Set up variables for the embed
      let prefix = bot.settings.prefix;
      let name = capitalize(cmd.name);
      let description = cmd.description;
      // let permission = capitalize(cmd.permission);
      let usage;
      let example;
      let aliases;
      if (cmd.usage != "") {
          usage = `\`${prefix}${cmd.name} ${cmd.usage}\``
      } else if (cmd.usage == "") {
          usage = `\`${prefix}${cmd.name}\``
      };
      if (cmd.example != "") {
          example = `\`${prefix}${cmd.name} ${cmd.example}\``
      } else if (cmd.example == "") {
          example = `\`${prefix}${cmd.name}\``
      }
      if (!cmd.options.aliases) {
          aliases = "None"
      } else {
          aliases = cmd.options.aliases.join(", ");
      }


      //Set up Embed
      let embed = {
          embeds: [{
              title: `Command: ${name}`,
              // description: "Syntax: <> = required, [] = optional",
              color: colours.blue,
              url: `https://wiki.benwhybrow.com/commands/${cmd.name}`,
              footer: {
                  icon_url: "https://i.imgur.com/BkZY6H8.png",
                  text: `Help Command | Syntax: <> = required, [] = optional`,
              },
              fields: [{
                      name: "Description:",
                      value: `${description}`,
                  },
                  {
                      name: "Usage:",
                      value: `${usage}`,
                  },
                  {
                      name: "Example:",
                      value: `${example}`,
                  },
                  {
                      name: "Aliases:",
                      value: `${aliases}`,
                  }
                  // {
                  //     name: "Permission",
                  //     value: `${permission}`,
                  // },
              ],
          }, ]
      };

      //Resolve with the embed
      resolve(embed);
  });
};

const eventEmbed = (colour, author, title, desc, fields, footer, bot) => {
  return new Promise((resolve, reject) => {

      let embedTemplate = {
          embeds: [{
              title: ``,
              description: ``,
              color: 0,
              timestamp: Date.now(),
              footer: {
                  icon_url: "https://i.imgur.com/BkZY6H8.png",
                  text: ``,
              },
              author: {
                  "name": ``,
                  "icon_url": ``
              },
              fields: [],
          }, ]
      };

      let noAuthorEmbedTemplate = {
          embeds: [{
              title: ``,
              description: ``,
              color: 0,
              timestamp: Date.now(),
              footer: {
                  icon_url: "https://i.imgur.com/BkZY6H8.png",
                  text: ``,
              },
              fields: [],
          }, ]
      };

      //Convert Colour
      let decimalColour = parseInt(colour, 16);

      //Author Check
      if (author == "None") {
          //Colour
          noAuthorEmbedTemplate.embeds[0].color = decimalColour;
          //Title
          if (typeof title == "string" && title.length < 256) {
              noAuthorEmbedTemplate.embeds[0].title = title;
          } else {
              reject("Title is invalid.");
          }
          //Desc
          if (typeof desc == "string" && desc.length < 2048) {
              noAuthorEmbedTemplate.embeds[0].description = desc;
          } else {
              reject("Description is invalid.");
          }
          //Footer
          if (typeof footer == "string" && footer.length < 2048) {
              noAuthorEmbedTemplate.embeds[0].footer.text = footer;
          } else {
              reject("Footer is invalid.");
          }
          //Fields
          fields.forEach((field) => {
              if (field.name.length < 256) {
                  if (field.value.length < 1024) {
                      noAuthorEmbedTemplate.embeds[0].fields.push(field);
                  } else {
                      reject("A field has a value that is too large.");
                  }
              } else {
                  reject("A field has a name that is too large.");
              }
          });
          resolve(noAuthorEmbedTemplate);
      } else {
          //Colour
          embedTemplate.embeds[0].color = decimalColour;
          //Author
          embedTemplate.embeds[0].author.name = `${author.username}#${author.discriminator}`;
          embedTemplate.embeds[0].author.icon_url = `${author.displayAvatarURL({ dynamic: true, format: "png" })}`;
          //Title
          if (typeof title == "string" && title.length < 256) {
              embedTemplate.embeds[0].title = title;
          } else {
              reject("Title is invalid.");
          }
          //Desc
          if (typeof desc == "string" && desc.length < 2048) {
              embedTemplate.embeds[0].description = desc;
          } else {
              reject("Description is invalid.");
          }
          //Footer
          if (typeof footer == "string" && footer.length < 2048) {
              embedTemplate.embeds[0].footer.text = footer;
          } else {
              reject("Footer is invalid.");
          }
          //Fields
          fields.forEach((field) => {
              if (field.name.length < 256) {
                  if (field.value.length < 1024) {
                      embedTemplate.embeds[0].fields.push(field);
                  } else {
                      reject("A field has a value that is too large.");
                  }
              } else {
                  reject("A field has a name that is too large.");
              }
          });
          //Footer icon
          // embedTemplate.footer.icon_url = bot.user.displayAvatarURL()
          resolve(embedTemplate);
      }
  });
};

module.exports = {
  createEmbed,
  noPermsEmbed,
  helpEmbed,
  eventEmbed
};