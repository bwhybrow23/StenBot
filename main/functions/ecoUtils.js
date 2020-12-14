const mongoose = require("mongoose");
const Economy = require("../models/economy");
const { Message } = require("discord.js");

const createUser = async (userid, balance) => {
    const user = new Economy({discordID: userid, balance: balance});
    await user.save();
    return user;
}

const getUser = async (userid) => {
    let user = await Economy.findOne({discordID: userid});
    if(!user) {
        await createUser(userid, 500).then((user1) => {
            user = user1
        })
    }
    return user;
}

const updateUser = async (userid, balance) => {
    const user = await getUser(userid);
    user.balance = balance;
    await user.save();
    return user;
}


module.exports = { createUser, getUser, updateUser };