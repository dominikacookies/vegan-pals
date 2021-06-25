const { Router } = require("express");
const {
  renderCookTogether,
  renderMyRecipes,
  renderMyRecipesCookTogether,
  renderCookTogetherPals,
} = require("../../controllers/html/private");

const router = Router();

router.get("/cooktogether/myrecipes/pals/:recipeId", renderCookTogetherPals);
router.get("/cooktogether/myrecipes/", renderMyRecipesCookTogether);
router.get("/cooktogether", renderCookTogether);
router.get("/myrecipes", renderMyRecipes);

module.exports = router;
