const { Router } = require("express");

const apiRoutes = require("./api");
const authRoutes = require("./auth")

const router = Router();

router.use("/api", apiRoutes);

routers.use("/auth", authRoutes)

//not sure what the below is. commenting out for now.
// router.use("/user", userRoutes)

// what does this do?
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
