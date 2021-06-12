const {User, Recipe, Intolerance } = require("tbc")

// get the user with 1
const user = async (req, res) => {
  try {
    const user = await User.findbyPk({ id:1 })
  } catch (error) {
    console.log(error)
  }
}

const {User, Recipe, Intolerance } = require("tbc")
// get the user with id 1 and their recipes and intolerances
const getUser = async () => {
  try {
    const user = await User.findbyPk(1, {
      include: [
        {
          model: Recipe
        },
        { 
          model: Intolerance
        }
      ]
    })
    console.log(user)
  } catch (error) {
    console.log(error)
  }
}
// get a recipe + users who have that recipe
const getRecipe = async () => {
  try {
    const recipe = await Recipe.findAll({
      where: {
        recipe_id : 716426,
      },
      include: [
        {
          model: User
        },
      ]
    });
    console.log(recipe)
  } catch (error) {
    console.log(error)
  }
}
// get all users with gluten intolerance
const getIntolerance = async () => {
  try {
    const intolerance = await Intolerance.findAll({
      where: {
        intolerance_name = "gluten"
      },
      include: [
        {
          model: User
        }
      ]
    })
    console.log(intolerance)
  } catch (error) {
    console.log(error)
  }
}