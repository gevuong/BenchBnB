// setup config folder to separate config connection from everything else. This allows you to easily change configuration to development config or production config.
var configValues = require('./config');

// returns connection string to the DB to connect to Mongo via Mongoose. You can pass in an option as an arg to determine if you want dev or prod, and return proper connection string.
module.exports = {
  getDBConnectionString: function() {
    return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds117316.mlab.com:17316/heroku_hsglzx5t';
  }
};

// heroku config:set DBUSER_SECRET=guest DBPASSWORD_SECRET=guest

// mongodb://<dbuser>:<dbpassword>@ds117316.mlab.com:17316/heroku_hsglzx5t
// heroku config:set PROD_MONGODB=mongodb://guest:guest@ds117316.mlab.com:17316/heroku_hsglzx5t