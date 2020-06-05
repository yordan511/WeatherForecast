require("dotenv").config();
const Koa = require("koa");
const jwt = require("koa-jwt");
const cors = require("@koa/cors");

const HttpStatus = require("http-status-codes");

const sequelize = require("./sequelize");
const auth = require("./jwt-auth");

const userController = require("./controllers/User");
const weatherController = require("./controllers/WeatherForecast");

const app = new Koa();
sequelize();

// Generic error handling middleware.
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status =
      error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});

app.use(cors());

//not authenticated routes
app.use(userController.routes()).use(userController.allowedMethods());

// authenticated routes
app.use(jwt({ secret: process.env.JWT_ENCRYPTION }));
app.use(weatherController.routes()).use(weatherController.allowedMethods());

// Application error logging.
// app.on("error", console.error);

module.exports = app;
