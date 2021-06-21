const { Router } = require("express");
const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
  renderRecipePage,
} = require("../../controllers/html/public");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);

router.get("/search-results", renderSearchResults);
router.get("/recipe/:id", renderRecipePage);

module.exports = router;
