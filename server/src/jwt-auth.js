const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("./models");

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_ENCRYPTION;

  passport.use(
    new Strategy(opts, async function (jwt_payload, done) {
      const user = await User.findById(jwt_payload.user_id);

      if (!user) return done(err, false);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};
