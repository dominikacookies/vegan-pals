const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const { CookTogether, User, Recipe } = require("../../models");

// TO DO: get user id
const userId = 1;

// get all cooktogether information specific to a user and group response by sent, accepted and received
const getAllCookTogethers = async (req, res) => {
  // TO DO: get user id from session
  const userId = 1;

  try {
    // get all received
    const requestedCookTogether = await CookTogether.findAll({
      where: {
        user_id: userId,
        status: "received",
      },
      raw: true,
      nested: true,
    });

    // get all sent
    const sentCookTogether = await CookTogether.findAll({
      where: {
        user_id: userId,
        status: "sent",
      },
      raw: true,
      nested: true,
    });

    const upcomingCookTogether = await CookTogether.findAll({
      where: {
        user_id: userId,
        status: "accepted",
      },
      raw: true,
      nested: true,
    });

    const cookTogetherData = {
      requestedCookTogether,
      sentCookTogether,
      upcomingCookTogether,
    };

    return res.status(200).json(cookTogetherData);
  } catch (error) {
    return res.status(500).json({
      error: "Could not get cooktogethers",
    });
  }
};

// create new cooktogether
// if somebody creates a new request
const createCookTogether = async (req, res) => {
  try {
    const {
      date,
      mealType,
      message,
      contactDetailsForSendingUser,
      userIdReceivingInvite,
    } = req.body;

    if (
      !date ||
      !mealType ||
      !message ||
      !contactDetailsForSendingUser ||
      !userIdReceivingInvite
    ) {
      return res.status(404).json({
        error: "Required values missing.",
      });
    }

    newCookTogetherId = uuidv4();

    const recipe = await Recipe.findOne({
      where: {
        recipe_id: req.session.recipeId,
      },
      raw: true,
      nested: true,
    });

    console.log(recipe);

    const newCookTogether = [
      // row for user requesting cook together
      {
        request_id: newCookTogetherId,
        datetime: date,
        meal_type: mealType,
        status: "sent",
        user_id: userId,
        recipe_id: req.session.recipeId,
        recipe_title: recipe.dish_name,
        recipe_image: recipe.image,
      },
      // row for user receiving cook together invite
      {
        request_id: newCookTogetherId,
        datetime: date,
        meal_type: mealType,
        message: message,
        contact_details: contactDetailsForSendingUser,
        status: "received",
        user_id: userIdReceivingInvite,
        recipe_id: req.session.recipeId,
        recipe_title: recipe.dish_name,
        recipe_image: recipe.image,
      },
    ];

    const newCookTogetherData = await CookTogether.bulkCreate(newCookTogether);

    delete req.session.recipeId;

    return res.status(200).json(newCookTogetherData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Could not create new cook together",
    });
  }
};

// update a cooktogether
// if somebody accepts a request
const updateCookTogether = async (req, res) => {
  try {
    const { contactDetails } = req.body;
    console.log(contactDetails);

    if (!contactDetails) {
      return res.status(404).json({
        error: "Required values missing.",
      });
    }

    const { cookTogetherId } = req.params;

    const updateStatusResult = await CookTogether.update(
      {
        status: "accepted",
      },
      {
        where: {
          request_id: cookTogetherId,
        },
      }
    );

    if (!updateStatusResult[0]) {
      return res.status(404).json({
        error: "Cook together doesn't exist",
      });
    }

    await CookTogether.update(
      {
        contact_details: contactDetails,
      },
      {
        where: {
          request_id: cookTogetherId,
          user_id: {
            [Op.ne]: userId,
          },
        },
      }
    );

    return res.status(200).json({
      message: "Update successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Could not update cook together",
    });
  }
};

// delete cooktogether
// if someone declines or cancels a request
const deleteCookTogether = async (req, res) => {
  try {
    const { cookTogetherId } = req.params;

    const deleteResult = await CookTogether.destroy({
      where: {
        request_id: cookTogetherId,
      },
    });

    if (!deleteResult) {
      return res.status(404).json({
        error: "Cook together doesn't exist",
      });
    }

    return res.status(200).json({
      message: "Cook together successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Couldn't delete cook together.",
    });
  }
};

// save recipe to favourites
const saveRecipe = async (req, res) => {
  const { loggedIn } = req.session;

  try {
    const { title, image, id } = req.body;

    if (!id || !title || !image) {
      return res.status(404).json({
        error: "Required values missing.",
      });
    }

    const newRecipe = {
      recipe_id: id,
      dish_name: title,
      user_id: req.session.user.id,
      image,
    };

    const newRecipeData = await Recipe.create(newRecipe);
    return res.status(200).json(newRecipeData);
  } catch (error) {
    if (!loggedIn) {
      return res.status(401).json({ error: "User not logged in" });
    } else {
      console.error(error.message);
      return res.status(500).json({
        error: "Could not save recipe",
      });
    }
  }
};

//remove recipe from favourites
const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const deleteResult = await Recipe.destroy({
      where: {
        recipe_id: recipeId,
        user_id: req.session.user.id,
      },
    });
    if (!deleteResult) {
      return res.status(404).json({
        error: "Recipe doesn't exist for this user",
      });
    }

    return res.status(200).json({
      message: "Recipe successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Couldn't delete recipe.",
    });
  }
};

const search = async (req, res) => {
  console.log("search result");
};

module.exports = {
  getAllCookTogethers,
  createCookTogether,
  updateCookTogether,
  deleteCookTogether,
  saveRecipe,
  deleteRecipe,
  search,
};
