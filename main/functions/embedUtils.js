const colours = {
    red: 14165566,
    green: 1295876,
    yellow: 14672927,
    blue: 4886754,
  };
  
  const createEmbed = (type, title, desc, fields, footer, bot) => {
    return new Promise((resolve, reject) => {
  
      let embedTemplate = {
        embed: {
          title: "",
          description: "",
          color: 0,
          // timestamp: Date.now(),
          footer: {
            icon_url: "https://i.imgur.com/BkZY6H8.png",
            text: ``,
          },
          fields: [],
        },
      };
  
      //Colour
      switch (type) {
        case "error":
          embedTemplate.embed.color = colours.red;
          break;
        case "success":
          embedTemplate.embed.color = colours.green;
          break;
        case "warning":
          embedTemplate.embed.color = colours.yellow;
          break;
        case "info":
          embedTemplate.embed.color = colours.blue;
          break;
        default:
          reject("Invald embed type.");
      }
      //Title
      if (typeof title == "string" && title.length < 256) {
        embedTemplate.embed.title = title;
      } else {
        reject("Title is invalid.");
      }
      //Desc
      if (typeof desc == "string" && desc.length < 2048) {
        embedTemplate.embed.description = desc;
      } else {
        reject("Description is invalid.");
      }
      //Footer
      if (typeof footer == "string" && footer.length < 2048) {
        embedTemplate.embed.footer.text = footer;
      } else {
        embedTemplate.embed.footer.icon_url = "";
      }
      //Fields
      fields.forEach((field) => {
        if (field.name.length < 256) {
          if (field.value.length < 1024) {
            embedTemplate.embed.fields.push(field);
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
        embed: {
          title: "",
          description: "",
          color: 0,
          timestamp: Date.now(),
          footer: {
            icon_url: "https://i.imgur.com/BkZY6H8.png",
            text: ``,
          },
          fields: [],
        },
      };
  
      //Color
      embedTemplate.embed.color = colours.red;
      //Desc
      embedTemplate.embed.description = `Error! You do not have permission to issue this command!`;
      //Footer
      if (typeof footer == "string" && footer.length < 2048) {
        embedTemplate.embed.footer.text = footer;
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
      if(bot.aliases.get(command.toLowerCase()) == undefined) {
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
        embed: {
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
        },
      };
  
      //Resolve with the embed
      resolve(embed);
    });
  };
  
  const eventEmbed = (colour, author, title, desc, fields, footer, bot) => {
    return new Promise((resolve, reject) => {
  
      let embedTemplate = {
        embed: {
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
        },
      };
  
      let noAuthorEmbedTemplate = {
        embed: {
          title: ``,
          description: ``,
          color: 0,
          timestamp: Date.now(),
          footer: {
            icon_url: "https://i.imgur.com/BkZY6H8.png",
            text: ``,
          },
          fields: [],
        },
      };
  
      //Convert Colour
      let decimalColour = parseInt(colour, 16);
  
      //Author Check
      if (author == "None") {
        //Colour
        noAuthorEmbedTemplate.embed.color = decimalColour;
        //Title
        if (typeof title == "string" && title.length < 256) {
          noAuthorEmbedTemplate.embed.title = title;
        } else {
          reject("Title is invalid.");
        }
        //Desc
        if (typeof desc == "string" && desc.length < 2048) {
          noAuthorEmbedTemplate.embed.description = desc;
        } else {
          reject("Description is invalid.");
        }
        //Footer
        if (typeof footer == "string" && footer.length < 2048) {
          noAuthorEmbedTemplate.embed.footer.text = footer;
        } else {
          reject("Footer is invalid.");
        }
        //Fields
        fields.forEach((field) => {
          if (field.name.length < 256) {
            if (field.value.length < 1024) {
              noAuthorEmbedTemplate.embed.fields.push(field);
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
        embedTemplate.embed.color = decimalColour;
        //Author
        embedTemplate.embed.author.name = `${author.username}#${author.discriminator}`;
        embedTemplate.embed.author.icon_url = `${author.displayAvatarURL({ dynamic: true, format: "png" })}`;
        //Title
        if (typeof title == "string" && title.length < 256) {
          embedTemplate.embed.title = title;
        } else {
          reject("Title is invalid.");
        }
        //Desc
        if (typeof desc == "string" && desc.length < 2048) {
          embedTemplate.embed.description = desc;
        } else {
          reject("Description is invalid.");
        }
        //Footer
        if (typeof footer == "string" && footer.length < 2048) {
          embedTemplate.embed.footer.text = footer;
        } else {
          reject("Footer is invalid.");
        }
        //Fields
        fields.forEach((field) => {
          if (field.name.length < 256) {
            if (field.value.length < 1024) {
              embedTemplate.embed.fields.push(field);
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