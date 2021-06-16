const express = require("express")
const session = require("express-session")
const handleBars = require("express-handle-bars")
const routes = require("./routes");

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");

const sequelizeStore = require("connect-session-sequelize")(session.Store)
const sessionOptions = {
    secret: "secret string",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
}

app.use(session(sessionOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
