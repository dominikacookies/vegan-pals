const express = require("express");
const path = require("path");
const session = require("express-session");
const handlebars = require("express-handlebars");
const routes = require("./routes");

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");

const sequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionOptions = {
  secret: "secret string",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

//handlebars
const hbs = handlebars.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
