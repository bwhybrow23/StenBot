const mongoose = require("mongoose");
const Guild = require("../models/guild");

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
    welcomer_enabled: false,
    welcomer_channel: "123456789",
    welcomer_message: "Hello there",
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
}

//Fetches all guilds from the database
const getAllGuilds = async () => {
    const guilds = await Guild.find({});
    return guilds;
    /*
    EXAMPLE
    bot.mutils.getAllGuilds().then(data => {console.log(data)})
    */
}

//Fetch guild by id
const getGuildById = async (id) => {
    const guild = await Guild.findOne({guild_id: id});
    return guild;
    /*
    EXAMPLE
    bot.mutils.getGuildById(1234567892).then(data => {console.log(data)})
    */
}

//Fetch guild by name
const getGuildByName = async (name) => {
    const guild = await Guild.findOne({guild_name: name});
    return guild;
    /*
    EXAMPLE
    bot.mutils.getGuildByName("Example").then(data => {console.log(data)})
    */
}

//Delete guild by id
const deleteGuildById = async (id) => {
    await Guild.findOneAndDelete({guild_id: id});
    /*
    EXAMPLE
    bot.mutils.deleteGuildById(123456789)
    */
}

//Delete guild by name
const deleteGuildByName = async (name) => {
    await Guild.findOneAndDelete({guild_name: name});
    /*
    EXAMPLE
    bot.mutils.deleteGuildByName("Example")
    */
}

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
}

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
}


module.exports = { createGuild, getAllGuilds, getGuildById, getGuildByName, deleteGuildById, deleteGuildByName, updateGuildById, updateGuildByName }