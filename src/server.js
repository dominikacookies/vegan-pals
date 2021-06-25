require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const handlebars = require("express-handlebars");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./routes");
const sequelize = require("./config/connection");
const helpers = require("./helpers/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "secret string",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

//handlebars

const handlebarsOptions = { helpers: helpers };
const hbs = handlebars.create(handlebarsOptions);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(cors());
app.use(session(sessionOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);

// sync sequelize models to the database, then turn on the server
const init = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to DB");
    console.log(error);
  }
};

init();
