//AUTHENTICATION
const bcrypt = require("bcrypt");
const mutils = require("../functions/mongoUtils");

const discord = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        await mutils.checkToken(token).then(discordID => {
            if(!discordID) console.log("no discord id")
            //Attach user ID and token
            req.token = token;
            req.discordID = discordID;
        });

        next();
    } catch (error) {
        // res.status(401).send({error: true, data: "Invalid authentication"});
        console.log(error);
        res.status(401).send("Broken, check console")
    }
}

module.exports = { discord };