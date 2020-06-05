const Router = require("koa-router");
const koaBody = require("koa-body");
const validator = require("email-validator");

const { User } = require("../../models/");
const { authUser } = require("../../services/User");

const router = new Router({
  prefix: "/users",
});

// get token
router.post("/login", koaBody(), async (ctx) => {
  const body = ctx.request.body;
  const user = await authUser(body);

  if (!user) {
    ctx.throw(400, "User not found");
  }

  ctx.body = {
    token: user.getJWT(),
  };
});

// Creates user
router.post("/", koaBody(), async (ctx) => {
  if (!validator.validate(ctx.request.body.email)) {
    ctx.throw(400, "Please provide a valid email");
  }
  if (!ctx.request.body.email || !ctx.request.body.password) {
    ctx.throw(400, "Please provide email and password");
  } else {
    if (await User.findOne({ where: { email: ctx.request.body.email } })) {
      ctx.throw(400, "User already exists");
    }

    await User.create({
      email: ctx.request.body.email,
      password: ctx.request.body.password,
    });
    ctx.body = { success: true };
  }
});

module.exports = router;
