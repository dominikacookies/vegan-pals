const { User, Recipe, Intolerance } = require("../../models")
const { truncate } = require("../../models/User")

// get the user with id 1 and their recipes and intolerances
const getUser = async () => {
  try {
    const user = await User.findByPk(1, {
      include: [
        {
          model: Recipe
        },
        { 
          model: Intolerance
        }
      ]
    })
    console.log(user.get({plain:true}))
  } catch (error) {
    console.log(error)
  }
}
// get a recipe + users who have that recipe
const getRecipes = async () => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        recipe_id : 716426,
      },
      include: [
        {
          model: User
        },
      ]
    });
    const data = recipes.map((each)=> {
    return each.get({plain:true})
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
// get all users with gluten intolerance
const getIntolerances = async () => {
  try {
    const intolerances = await Intolerance.findAll({
      where: {
        intolerance_name:"gluten"
      },
      include: [
        {
          model: User
        }
      ]
    })
    const data = intolerances.map((each)=> {
      return each.get({plain:true})
      })
      console.log(data)
  } catch (error) {
    console.log(error)
  }
}
const getMultipleIntolerances = async () => {
  try {
    const intolerances = await Intolerance.findAll({
      where: {
        intolerance_name:"gluten"
      },
      include: [
        {
          model: User
        }
      ]
    })
    const data = intolerances.map((each)=> {
      return each.get({plain:true})
      })
      console.log(data)
  } catch (error) {
    console.log(error)
  }
}

// getUser()
// getRecipes()
// getIntolerances()
getMultipleIntolerances()