// get all cooktogether information specifc to a user and group response by sent, accepted and received
const getAllCookTogethers = async (req, res) => {
  console.log("getting all cook together")
}

// create new cooktogether
// if somebody creates a new request
const createCookTogether = async (req, res) => {
  console.log("creating cook together")
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