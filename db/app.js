var databaseName = 'pgt1';

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'root',
        database : databaseName,
        charset  : 'utf8'
  }
});
var Bookshelf = require('bookshelf')(knex);

var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// application routing
var router = express.Router();

// for forms

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
 *   Models
**/

// User model
var User = Bookshelf.Model.extend({
  tableName: 'user',

  device: function () {
    return this.belongsTo(device);
  },

  hasTimestamps: false,
});

// Device model
var Device = Bookshelf.Model.extend({

  tableName: 'device',

  hasTimestamps: false,

  location: function () {
    return this.belongsTo(User);
  },
});

// Location model
var Loc = Bookshelf.Model.extend({

  tableName: 'location',

  posts: function () {
    return this.belongsTo(Device);
  }
});



var Users = Bookshelf.Collection.extend({
  model: User
});

var Devices = Bookshelf.Collection.extend({
  model: Device
});

var Locations = Bookshelf.Collection.extend({
  model: Loc
});

/*
### Users
 - `GET    /users`    - fetch all users
 - `POST   /user`     - create a new user
 - `GET    /user/:id` - fetch a single user
 - `PUT    /user/:id` - update user
 - `DELETE /user/:id` - delete user


*/


router.route('/users')
  // fetch all users
  .get(function (req, res) {
    Users.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  //

  // create a user
  .post(function (req, res) {
    User.forge({
      username: req.body.username,
      password: req.body.password,
      customerID: req.body.customerID,
      phone: req.body.phone,
      address: req.body.address,
      realName: req.body.realName,
      realFamily: req.body.realFamily,
      legalName: req.body.legalName,
    })
    .save()
    .then(function (user) {
      res.json({error: false, data: user.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

router.route('/users/:id')
  // fetch user
  .get(function (req, res) {
    User.forge({id: req.params.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: user.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })

  // update user details
  .put(function (req, res) {
    User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.save({
        name: req.body.username || user.get('username'),
        email: req.body.email || user.get('email')
      })
      .then(function () {
        res.json({error: false, data: {message: 'User details updated'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })

  // delete a user
  .delete(function (req, res) {
    User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'User successfully deleted'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });


  router.route('/devices')
    // fetch all devices
    .get(function (req, res) {
      Device.forge()
      .fetch()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })

    // create a device
    .post(function (req, res) {
      Device.forge({
        identifier: req.body.identifier,
        model: req.body.model,
        type: req.body.type
      })
      .save()
      .then(function (user) {
        res.json({error: false, data: {id: user.get('id')}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    });

  router.route('/users/:id')
    // fetch user
    .get(function (req, res) {
      User.forge({id: req.params.id})
      .fetch()
      .then(function (user) {
        if (!user) {
          res.status(404).json({error: true, data: {}});
        }
        else {
          res.json({error: false, data: user.toJSON()});
        }
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })

    // update user details
    .put(function (req, res) {
      User.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (user) {
        user.save({
          name: req.body.name || user.get('name'),
          email: req.body.email || user.get('email')
        })
        .then(function () {
          res.json({error: false, data: {message: 'User details updated'}});
        })
        .catch(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })

    // delete a user
    .delete(function (req, res) {
      User.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (user) {
        user.destroy()
        .then(function () {
          res.json({error: true, data: {message: 'User successfully deleted'}});
        })
        .catch(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    });

    app.post('/login',function(req,res){
      var username=req.body.user;
      var password=req.body.password;
      console.log("User name after = "+username+", password is "+password);

      User.forge({username: req.body.username, password: req.body.password})
      .fetch({require: true})
      .then(function (user) {
        if (!user) {
          res.status(404).json({error: true, data: {}});
        }
        else {
          res.json({error: false, data: user.toJSON()});
        }
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });


      // res.end("yes");
    });

  app.use('/api', router);

  app.listen(3002, function() {
    console.log("✔ Express server listening on port %d in %s mode", 3002, app.get('env'));
  });
