const { Router } = require("express");
const {
  getAllReceived,
  getUserInfo,
  getRecipe,
  getAllUpcoming,
  getNearestUpcoming,
  getAllSent,
} = require("./controllers");

const router = Router();

//pals page
router.get("/cooktogether/myrecipes/pals");

//recipe
router.get("/myrecipes/recipe", getRecipe);
module.exports = router;
