const { Router } = require("express");

const apiRoutes = require("../controllers/api");
const userRoutes = require("../controllers/userRoutes")

const router = Router();

router.use("/api", apiRoutes);

router.use("/user", userRoutes)

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
