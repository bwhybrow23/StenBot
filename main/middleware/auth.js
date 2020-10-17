//AUTHENTICATION
const bcrypt = require("bcrypt");
const mutils = require("../functions/mongoUtils");

const discord = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        let dID;
        mutils.checkToken(token).then(discordID => {
            if(!discordID) throw new Error()
            dID = discordID;
        });

        //Attach user ID and token
        req.token = token;
        req.discordID = dID;
        next();
    } catch (error) {
        res.status(401).send({error: true, data: "Invalid authentication"});
    }
}

module.exports = { discord };