const { Router } = require("express");

const { getAllCookTogethers, createCookTogether, updateCookTogether, deleteCookTogether, saveRecipe, deleteRecipe } = require("../../controllers/api")

const router = Router();

router.get("/cooktogether", getAllCookTogethers);
router.post("/cooktogether", createCookTogether);
router.put("/cooktogether/:id", updateCookTogether);
router.delete("/cooktogether/:id", deleteCookTogether)
router.post("/search", search)

router.post("/recipe", saveRecipe)
router.delete("/recipe/:id", deleteRecipe)


module.exports = router;
