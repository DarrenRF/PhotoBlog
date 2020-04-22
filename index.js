const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const path = require('path');
const history = require('connect-history-api-fallback');
const middleware = require('webpack-dev-middleware');
const keys = require('./config/keys');
const webPackConfig = require('./config/webpack.config.js');

require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);
require('./routes/uploadRoutes')(app);


//if (['production', 'ci'].includes(process.env.NODE_ENV)) {
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});
//}

if (process.env.PORT !== 'production') {
  app.use(
    middleware(webpack(webPackConfig('development')))
  )
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
