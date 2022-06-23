const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Guild = require("../models/guild");
const User = require("../models/user");
const UserBlacklist = require("../models/userblacklist");
const Discord = require("discord.js");

/** 

GUILD FUNCTIONS

**/
//Create a new guild in the database
const createGuild = async (data) => {
  const guild = new Guild(data);
  await guild.save();
  return guild;
  /*
  EXAMPLE
  bot.mutils.createGuild({
  guild_id: "123456789",
  guild_name: "Example",
  guild_owner_id: "123456789",
  blacklisted: false,
  welcome_enabled: false,
  welcome_channel: "123456789",
  welcome_message: "Hello there",
  userjoin_enabled: false,
  userjoin_role: "123456789",
  userjoin_nickname: "Joe",
  staff_role: "123456789",
  staff_admin: false,
  staff_linkblock: false,
  staff_filter: ["penis"],
  staff_autoban: "",
  logging_enabled: false,
  logging_channel: "123456789",
  logging_level: "medium",
  tickets_enabled: false,
  tickets_message: "Hello",
  music_enabled: false,
  levelling_enabled: false
  });
  */
};

//Fetches all guilds from the database
const getAllGuilds = async () => {
  const guilds = await Guild.find({}).clone();
  return guilds;
  /*
  EXAMPLE
  bot.mutils.getAllGuilds().then(data => {console.log(data)})
  */
};

//Fetch guild by id
const getGuildById = async (id) => {
  const guild = await Guild.findOne({"info.id": id}).clone();
  if(!guild) return;
  return guild;
  /*
  EXAMPLE
  bot.mutils.getGuildById(1234567892).then(data => {console.log(data)})
  */
};

//Fetch guild by name
const getGuildByName = async (name) => {
  const guild = await Guild.findOne({"info.name": name}).clone();
  if(!guild) return;
  return guild;
  /*
  EXAMPLE
  bot.mutils.getGuildByName("Example").then(data => {console.log(data)})
  */
};

//Delete guild by id
const deleteGuildById = async (id) => {
  await Guild.findOneAndDelete({"info.id": id});
  /*
  EXAMPLE
  bot.mutils.deleteGuildById(123456789)
  */
};

//Delete guild by name
const deleteGuildByName = async (name) => {
  await Guild.findOneAndDelete({"info.name": name});
  /*
  EXAMPLE
  bot.mutils.deleteGuildByName("Example")
  */
};

//Update guild by id
const updateGuildById = async (id, data) => {
  const guild = await getGuildById(id);
  const updates = Object.keys(data);
  updates.forEach(update => guild[update] = data[update]);
  await guild.save();
  return guild;
  /*
  EXAMPLE
  bot.mutils.updateGuildById(123456789, { blacklisted: true }).then(guild => console.log(guild))
  */
};

//Update guild by name
const updateGuildByName = async (name, data) => {
  const guild = await getGuildByName(name);
  const updates = Object.keys(data);
  updates.forEach(update => guild[update] = data[update]);
  await guild.save();
  return guild;
  /*
  EXAMPLE
  bot.mutils.updateGuildByName("Example", { blacklisted: false }).then(guild => console.log(guild))
  */
};

/** 

USER FUNCTIONS

**/
// Password Hashing Function
const genAuthToken = async function() {
  const select = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890?&!£$%#-";
  let token = "";
  for (let x = 0; x <= 40; x++) {
    let ranInt = Math.floor(Math.random() * 62);
    token = token.concat(select[ranInt]);
  }
  // let hashedToken = await bcrypt.hash(token, 12);

  // let data = {
  //     token: token,
  //     hashedToken: hashedToken
  // }
  // return (data);
  return (token);
};

// Create a user
const createUser = async (id) => {
  let authToken;
  // let normalToken;
  await genAuthToken().then(token => {
    authToken = token;
    // normalToken = data.token
  });
  //Check if user already has a token
  if (await User.findOne({ discordID: id })) {
    let profile = await User.findOne({
      discordID: id
    })
    let authToken = profile.token;
    return authToken;
  }
  //Check if token already exists in database
  if (await User.findOne({
      token: authToken
    })) {
    await genAuthToken().then(token => {
      authToken = token;
      // normalToken = data.token
    });
  } else {
    const data = {
      discordID: id,
      token: authToken
    };
    const user = new User(data);
    await user.save();
    return (user, authToken);
  }
  /* 
  EXAMPLE
  bot.createUser(583374339626238107).then(user => console.log(user));
  */
};

//Match Token and Return User ID
const checkToken = async (token) => {
  // let hashedToken = await bcrypt.hash(token, 12);
  // console.log(hashedToken);
  let profile = await User.findOne({
    token: token
  });
  let discordID;
  if (!profile) discordID = 0
  else discordID = profile.discordID
  return discordID;
  /*
  EXAMPLE
  bot.checkToken("KJ0pWV8R95kZ5pJfySVGIPeEnT7TL6ScfO1G").then(discordID => console.log(discordID));
  */
}

//Blacklist User
const blacklistUser = async (data) => {
  const user = new UserBlacklist(data);
  await user.save();
  return user;
  /* 
  EXAMPLE
  bot.mutils.blacklistUser({
      user_id: "",
      blacklisted: true
  });
  */
}

const checkBlacklist = async (user) => {
  let data = UserBlacklist.findOne({
    user_id: user
  });
  return data;
}

module.exports = {
  createGuild,
  getAllGuilds,
  getGuildById,
  getGuildByName,
  deleteGuildById,
  deleteGuildByName,
  updateGuildById,
  updateGuildByName,
  createUser,
  checkToken,
  blacklistUser,
  checkBlacklist
}