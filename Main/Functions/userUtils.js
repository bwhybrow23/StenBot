//Needed stuff
import User from '../Models/user.js';

/**
 * Create a user in the database
 */
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
    });
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

/**
 * Get User
 */
const getUser = async (userid) => {
  let user = await User.findOne({ discordID: userid }).clone();
  if (!user) {
    await createUser(userid).then(u => user = u);
  }
  return user;
};

/**
 * Update User
 */
const updateUser = async (id, data) => {

  //Find user. If one doesn't exist, create it.
  let user = await getUser(id);
  if(!user) {
    await createUser(id).then(u => user = u);
  }

  //Append each data change individually
  const updates = Object.keys(data);
  updates.forEach(update => user[update] = data[update]);

  //Save and return
  await User.updateOne({ discordID: id }, { $set: data });
  return user;

};

/**
 * Match token and return profile data
 */
const checkToken = async (token) => {
  // let hashedToken = await bcrypt.hash(token, 12);
  // console.log(hashedToken);
  let profile = await User.findOne({
    token: token
  });
  let discordID;
  if (!profile) discordID = 0;
  else discordID = profile.discordID;
  return discordID;
  /*
  EXAMPLE
  bot.checkToken("KJ0pWV8R95kZ5pJfySVGIPeEnT7TL6ScfO1G").then(discordID => console.log(discordID));
  */
};

/**
 * Password Hashing Function
 */
const genAuthToken = async function() {
  const select = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890?&!£$%#-';
  let token = '';
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


export default {
  createUser,
  getUser,
  updateUser,
  checkToken
};