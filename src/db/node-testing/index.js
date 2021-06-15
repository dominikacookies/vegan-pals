const { User, Recipe } = require("../../models");
const { Op } = require("sequelize");

const sequelize = require("sequelize");

// get the user with id 1 and their recipes and intolerances
const getUser = async () => {
  try {
    const user = await User.findByPk(1, {
      include: [
        {
          model: Recipe,
        },
        {
          model: Intolerance,
        },
      ],
    });
    console.log(user.get({ plain: true }));
  } catch (error) {
    console.log(error);
  }
};
// get a recipe + users who have that recipe
const getRecipes = async () => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        user_id: 2,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    const data = recipes.map((each) => {
      return each.get({ plain: true });
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// get all users with gluten intolerance
const getIntolerances = async () => {
  try {
    const intolerances = await User.findAll({
      where: {
        [Op.and]: [
          { gluten_intolerance: true },
          { grain_intolerance: false },
          { soy_intolerance: false },
          { peanuts_intolerance: false },
          { sesame_intolerance: false },
          { sulphite_intolerance: false },
          { tree_nut_intolerance: false },
          { wheat_intolerance: false },
        ],
      },
    });
    const data = intolerances.map((each) => {
      return each.get({ plain: true });
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
//req and res >
const getMultipleIntolerances = async (id) => {
  try {
    const intolerances = await Intolerance.findAll({
      where: {
        user_id: id,
      },
      // after setting up routes use req.params.id (where to get the user id from)
      // request string as params or from req.session
      include: [
        {
          model: User,
        },
      ],
    });
    const data = intolerances.map((each) => {
      return each.get({ plain: true });
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// getUser()
getRecipes();
getIntolerances();
// getMultipleIntolerances(1)
