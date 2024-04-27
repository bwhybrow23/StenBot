const Guild = require('../Models/guild');
const UserBlacklist = require('../Models/userblacklist');

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
  const guild = await Guild.findOne({'info.id': id}).clone();
  if(!guild) return;
  return guild;
  /*
  EXAMPLE
  bot.mutils.getGuildById(1234567892).then(data => {console.log(data)})
  */
};

//Fetch guild by name
const getGuildByName = async (name) => {
  const guild = await Guild.findOne({'info.name': name}).clone();
  if(!guild) return;
  return guild;
  /*
  EXAMPLE
  bot.mutils.getGuildByName("Example").then(data => {console.log(data)})
  */
};

//Delete guild by id
const deleteGuildById = async (id) => {
  await Guild.findOneAndDelete({'info.id': id});
  /*
  EXAMPLE
  bot.mutils.deleteGuildById(123456789)
  */
};

//Delete guild by name
const deleteGuildByName = async (name) => {
  await Guild.findOneAndDelete({'info.name': name});
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
};

const checkBlacklist = async (user) => {
  let data = UserBlacklist.findOne({
    user_id: user
  });
  return data;
};

module.exports = {
  createGuild,
  getAllGuilds,
  getGuildById,
  getGuildByName,
  deleteGuildById,
  deleteGuildByName,
  updateGuildById,
  updateGuildByName,
  blacklistUser,
  checkBlacklist
};