var mongoose = require('mongoose');
var DifferenceModel = require('../models/difference.js');
var Difference = mongoose.model('Difference');
var SquareOfSums = require('../../public/js/lib/classes/square-of-sums');
var SumOfSquares = require('../../public/js/lib/classes/sum-of-squares');

module.exports = function(server) {

  // Request a difference based on a value
  server.get('/difference', function(req, res, next) {

    var sumOfSquares, squareOfSums;

    // confirm the number is present for calculation
    if (!req.params.number) {
      res.status(500);
      return next(new Error('A number is required to process a difference'));
    }

    // cast param as an Int
    var number = parseInt(req.params.number, 10);

    // calculate the necessary values and handle any resulting errors
    try {
      squareOfSums = new SquareOfSums(number).calculate();
      sumOfSquares = new SumOfSquares(number).calculate();
    } catch (e) {
      res.status(500);
      return next(e);
    }

    // find the number of requests for the same number
    Difference.where({number: number }).count(function(err, count) {
      // increment the count
      var updatedCount = count += 1;

      // store the new difference
      var diff = new Difference({
        number: number,
        value: squareOfSums - sumOfSquares,
        occurrences: updatedCount
      })
      diff.save();

      // transform the object for display and send the response
      diffObj = diff.toObject();

      res.status(200);
      res.send(diffObj);

      return next();
    });

  });

  // handle requests for the last X number of calculated differences
  server.get('/differences/:qty', function(req, res, next) {

    // set a limit if its not supplied
    var limit = req.params.qty || 20;

    // retrieve the appropriate entries, transform them for display and send the response
    Difference
      .find()
      .limit(limit)
      .sort({createdOn: 'desc'})
      .exec(function(err, data) {
        var formattedData = [];
        data.forEach(function(difference) {
          formattedData.push(difference.toObject());
          // difference.toObject()
        });
        res.status(200);
        res.send(formattedData);

        return next();
      });

  });

}