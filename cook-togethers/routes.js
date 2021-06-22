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

//cook togethers
router.get("cooktogether/cooktogethers/upcoming", getAllUpcoming);
router.get("cooktogether/cooktogethers/received", getAllReceived);
module.exports = router;
