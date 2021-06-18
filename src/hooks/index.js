const bcrypt = require("bcrypt");

const beforeBulkCreate = async (users) => {
  const hashPasswords = users.map((user) => {
    return bcrypt.hash(user.password, 10);
  });

  const passwords = await Promise.all(hashPasswords);

  passwords.forEach((password, index) => {
    users[index].password = password;
  });
};

const beforeCreate = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
};

module.exports = {
  beforeBulkCreate,
  beforeCreate,
};
