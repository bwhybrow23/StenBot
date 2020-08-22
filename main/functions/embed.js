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
        timestamp: Date.now(),
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

const helpEmbed = (command, fields, footer, bot) => {
  return new Promise((resolve, reject) => {
    //Capitalize function
    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    //Get command info
    const cmd =
      bot.commands.get(command.toLowerCase()) ||
      bot.commands.get(bot.aliases.get(command.toLowerCase()));
    if (!cmd) {
      reject(`Cannot find command under the name of ${command}`);
    }

    //Set up Embed
    let embed = {
      embed: {
        title: `Command: ${capitalize(cmd.name)}`,
        description: "Syntax: <> = required, [] = optional",
        color: colours.blue,
        url: `https://sbdocs.benwhybrow.com/commands#${capitalize(cmd.name)}`,
        footer: {
          icon_url: "https://i.imgur.com/BkZY6H8.png",
          text: ``,
        },
        fields: [
          {
            name: "Description",
            value: `${cmd.description}`,
          },
          {
            name: "Usage",
            value: `${cmd.usage}`,
          },
        ],
      },
    };

    //Input Footer
    if (typeof footer == "string" && footer.length < 2048) {
      embed.embed.footer.text = footer;
    } else {
      reject("Footer is invalid.");
    }

    //Fields
    fields.forEach((field) => {
      if (field.name.length < 256) {
        if (field.value.length < 1024) {
          embed.embed.fields.push(field);
        } else {
          reject("A field has a value that is too large.");
        }
      } else {
        reject("A field has a name that is too large.");
      }
    });

    //Resolve with the embed
    resolve(embed);
  });
};

module.exports = { createEmbed, noPermsEmbed, helpEmbed };
