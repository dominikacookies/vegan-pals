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

router.post("/search", renderSearchResults);

module.exports = router;
