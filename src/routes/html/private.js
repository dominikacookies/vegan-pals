const { Router } = require("express");
const {
  renderCookTogether,
  renderMyRecipes,
  renderMyRecipesCookTogether,
} = require("../../controllers/html/private");

const router = Router();

router.get("/cooktogether/myrecipes/pals", renderCookTogether);
router.get("/cooktogether/myrecipes/", renderMyRecipesCookTogether);
router.get("/myrecipes", renderMyRecipes);

module.exports = router;
