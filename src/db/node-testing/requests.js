const { CookTogether } = require("../../models");

const sequelize = require("sequelize");

const getAllReceivedCookTogether = async () => {
  try {
    const receivedCookTogether = await CookTogether.findAll({
      where: {
        user_id: 1,
        status: "received",
      },
      raw: true,
      nested: true,
    });
    console.log(receivedCookTogether);
  } catch (error) {
    console.log(error);
  }
};

const getAllUpcomingCookTogether = async () => {};

const getAllSentCookTogether = async () => {};

const acceptCookTogether = async () => {};

const deleteCookTogether = async () => {};

getAllReceivedCookTogether();
