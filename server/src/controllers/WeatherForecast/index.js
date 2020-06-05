const Router = require("koa-router");
const passport = require("passport");
const koaBody = require("koa-body");

const router = new Router({
  prefix: "/weather",
});

router.get("/", async (ctx) => {
  ctx.body = "this route is authenticated";
});

module.exports = router;
