exports.run = async(bot, message, args) => {

	const Discord = require("discord.js");
	const fs = require("fs");

	message.reply(`This command is under maintenance. Sorry for the inconvenience.`)

// 	if (message.mentions.users.first()) {

// 		var output = await eco.Leaderboard({
// 			filter: x => x.balance > 50,
// 			search: message.mentions.users.first().id
// 		})
// 		message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output} on my leaderboard!`);

// 	} else {

// 		eco.Leaderboard({
// 			limit: 10, //Only takes top 10 ( Totally Optional )
// 		}).then(async users => { //make sure it is async

// 			if (users[0]) var first = await bot.fetchUser(users[0].userid)
// 			if (users[1]) var second = await bot.fetchUser(users[1].userid)
// 			if (users[2]) var third = await bot.fetchUser(users[2].userid)
// 			if (users[3]) var fourth = await bot.fetchUser(users[3].userid)
// 			if (users[4]) var fifth = await bot.fetchUser(users[4].userid)
// 			if (users[5]) var sixth = await bot.fetchUser(users[5].userid)
// 			if (users[6]) var seventh = await bot.fetchUser(users[6].userid)
// 			if (users[7]) var eigth = await bot.fetchUser(users[7].userid)
// 			if (users[8]) var ninth = await bot.fetchUser(users[8].userid)
// 			if (users[9]) var tenth = await bot.fetchUser(users[9].userid)

// 			message.channel.send(`StenBot Leaderboard:
//     \`\`\`
// 1 - ${first && first.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
// 2 - ${second && second.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
// 3 - ${third && third.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}
// 4 - ${fourth && fourth.tag || 'Nobody Yet'} : ${users[3] && users[3].balance || 'None'}
// 5 - ${fifth && fifth.tag || 'Nobody Yet'} : ${users[4] && users[4].balance || 'None'}
// 6 - ${sixth && sixth.tag || 'Nobody Yet'} : ${users[5] && users[5].balance || 'None'}
// 7 - ${seventh && seventh.tag || 'Nobody Yet'} : ${users[6] && users[6].balance || 'None'}
// 8 - ${eigth && eigth.tag || 'Nobody Yet'} : ${users[7] && users[7].balance || 'None'}
// 9 - ${ninth && ninth.tag || 'Nobody Yet'} : ${users[8] && users[8].balance || 'None'}
// 10 - ${tenth && tenth.tag || 'Nobody Yet'} : ${users[9] && users[9].balance || 'None'} \`\`\` `)
// 		})
// 	}
}
