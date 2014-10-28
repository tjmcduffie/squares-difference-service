// environment & config

var config = require('../config/server');
var mongoose = require('mongoose');

function connect(callback) {
 var options = {
    server: {
      socketOptions: { keepAlive: 1 }
    }
  };
  mongoose.connect(config.mongo, options, callback);
};

module.exports = {

  connect: function(callback) {
    connect(callback);

    // Error handler
    mongoose.connection.on('error', function (err) {
      console.log('Mongo Error: ' + err);
    });

    // Reconnect when closed
    mongoose.connection.on('disconnected', function () {
      connect();
    });
  }

};