const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const subtitles = require('./routes/subtitles');

const app = express();

let env = process.env.NODE_ENV;
if(!env) env = 'development'
const config = require(`./config/config.${env}.json`);
require('./database')(`mongodb://${config.databaseConfig.host}:27017/${config.databaseConfig.database}`)


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use('/legendas', subtitles);

module.exports = app;
