const { Router } = require("express");
const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
} = require("../../controllers/html/public");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);

router.get("/search-results", renderSearchResults);

module.exports = router;
