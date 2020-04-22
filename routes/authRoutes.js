const passport = require('passport');

module.exports = app => {
  try {
    app.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email']
      })
    );
  } catch (e) {
    console.log(e);
  }


  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/blogs');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  try {
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });
  } catch (e) {
    console.log(e);
  }
};
