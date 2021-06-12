const {User, Recipe, Intolerance } = require("tbc")

// get the user with 1
const user = async (req, res) => {
  try {
    const user = await User.findbyPk({ id:1 })
  } catch (error) {
    console.log(error)
  }
}

// get a user's recipes

// get a user's intolerances

// get a recipe

// get all users who saved a recipe

// get all users with gluten intolerance