const Router = require("koa-router");
const passport = require("passport");
const koaBody = require("koa-body");
const fetch = require("node-fetch");

const router = new Router({
  prefix: "/weather",
});

const route = `http://api.openweathermap.org/data/2.5/forecast/daily?q=Sofia&units=metric&cnt=7&appid=${process.env.OPEN_WEATHER_KEY}`;

router.get("/", async (ctx) => {
  const openWeatherData = await fetch(route);
  ctx.body = await openWeatherData.json();
});

module.exports = router;
