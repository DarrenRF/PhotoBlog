const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  console.log('serializeUser ' + user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser ' + id);
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: 'CALLBACK_URL',
      clientID: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          console.log('existingUser ' + existingUser);
          return done(null, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName
        }).save();
        console.log('new user ' + user);
        done(null, user);
      } catch (err) {
        console.log('new user err ' + err);
        done(err, null);
      }
    }
  )
);