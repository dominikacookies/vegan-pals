const { CookTogether, User, Recipe } = require("../../models")

// get all cooktogether information specific to a user and group response by sent, accepted and received
const getAllCookTogethers = async (req, res) => {

  // TO DO: get user id from session

  try {
  // get all received
  const requestedCookTogether = await CookTogether.findAll({
    where: {
      user_id: 1,
      status: "received",
    },
    raw: true,
    nested: true,
  })

  // get all sent
  const sentCookTogether = await CookTogether.findAll({
    where: {
      user_id: 1,
      status: "sent",
    },
    raw: true,
    nested: true,
  })
  
  const upcomingCookTogether = await CookTogether.findAll({
    where: {
      user_id: 1,
      status: "accepted",
    },
    raw: true,
    nested: true,
  })
  
  const cookTogetherData = {
    requestedCookTogether,
    sentCookTogether,
    upcomingCookTogether
  }

  res.status(200).json(cookTogetherData)
    
  } catch (error) {
    res.status(500).json({
      error: "Could not get cooktogethers"
    })
  }
}

// create new cooktogether
// if somebody creates a new request
const createCookTogether = async (req, res) => {
  const { dateTime, mealType, message, contactDetailsForSendingUser, userIdReceivingInvite, recipeId, recipeTitle } = req.body
  
  if (!dateTime || !mealType || !message || !contactDetailsForSendingUser || !userIdReceivingInvite || !recipeId || !recipeTitle) {
    res.status(404).json({
      error: "Missing parameters",
    })
  }
}

// update a cooktogether
// if somebody accepts a request
const updateCookTogether = async (req, res) => {
   console.log("updating cook together")
}

// delete cooktogether
// if someone declines or cancels a request
const deleteCookTogether = async (req, res) => {
  console.log("deleting cook together")
}

// save recipe to favourites
const saveRecipe = async (req, res) => {
  console.log("saving recipe")
}

//remove recipe from favourites
const deleteRecipe = async (req, res) => {
  console.log("deleting recipe")
}

module.exports = {
  getAllCookTogethers,
  createCookTogether,
  updateCookTogether,
  deleteCookTogether,
  saveRecipe,
  deleteRecipe
}