const { raw } = require("express");
const { Op } = require("sequelize");

const { CookTogether, User, Recipe } = require("../src/models");

//how do I get ids from session??
const userId = 2;
recipeId = 798400;

// Requests fns
const getAllReceived = async (req, res) => {
  try {
    const allReceived = await CookTogether.findAll({
      where: {
        user_id: userId,
        status: "received",
      },
      raw: true,
      nested: true,
    });
    console.log(allReceived);
  } catch (error) {
    console.log(error);
  }
};

const getAllUpcoming = async (req, res) => {
  try {
    const allUpcoming = await CookTogether.findAll({
      where: {
        //user_id: userId,
        status: "accepted",
      },
      raw: true,
      nested: true,
    });
    console.log(allUpcoming);
  } catch (error) {
    console.log(error);
  }
};

//how to filter by datetime??
const getNearestUpcoming = async (req, res) => {
  try {
    const nearestUpcoming = await CookTogether.findOne({
      where: {
        user_id: userId,
        status: "accepted",
      },
      raw: true,
      nested: true,
    });
    console.log(nearestUpcoming);
  } catch (error) {
    console.log(error);
  }
};

const getAllSent = async (req, res) => {
  try {
    const allSent = await CookTogether.findOne({
      where: {
        user_id: userId,
        status: "sent",
      },
      raw: true,
      nested: true,
    });
    console.log(allSent);
  } catch (error) {
    console.log(error);
  }
};

// User info
const getUserInfo = async (req, res) => {
  try {
    const userInfo = await User.findAll({
      where: {
        id: userId,
      },
      raw: true,
      nested: true,
    });
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipeInfo = await Recipe.findAll({
      where: {
        recipe_id: recipeId,
      },
      raw: true,
      nested: true,
    });
    console.log(recipeInfo);
  } catch (error) {
    console.log(error);
  }
};

//getAllReceived();
//getUserInfo();
//getRecipe();
//getAllUpcoming();
//getNearestUpcoming();
getAllSent();
