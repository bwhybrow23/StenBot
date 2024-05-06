import Economy from '../Models/economy.js';

const createUser = async (userid, balance) => {
  const user = await new Economy({
    discordID: userid,
    balance: balance
  });
  await user.save();
  return user;
};

const getUser = async (userid) => {
  let user;
  user = await Economy.findOne({ discordID: userid }).clone();
  if (!user) {
    user = await createUser(userid, 500);
  }
  return user;
};

const updateUser = async (userid, balance) => {
  let user;
  if(!balance) {
    user = 'NO VALID BALANCE';
    return user;
  }
  user = await getUser(userid);
  if (!user) {
    createUser(userid, 500).then((user1) => {
      user = user1;
    });
  }
  user.balance = balance;
  await user.save();
  return user;
};

export default {
  createUser,
  getUser,
  updateUser
};