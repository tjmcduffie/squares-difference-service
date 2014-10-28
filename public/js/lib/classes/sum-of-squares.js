/* global define, exports, module */
/* TODO: Abstract out functionality in common with SumOfSquares to make DRYer */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([factory]);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.SDS.SumOfSquares = factory();
    }
}(this, function () {

  var SumOfSquares = function(number) {
    if (number < SumOfSquares.lowerLimit || number > SumOfSquares.upperLimit) {
      throw new Error('The base number must be between ' + SumOfSquares.lowerLimit + ' and ' +
          SumOfSquares.upperLimit);
    }
    this.number = number;
  };


  /**
   * Lower Limit of calculations
   * @type {Number}
   */
  SumOfSquares.lowerLimit = 0;


  /**
   * Upper Limit of calculations
   * @type {Number}
   */
  SumOfSquares.upperLimit = 100;


  /**
   * Calculation Cache
   * @type {Object}
   */
  SumOfSquares.sumCache = [];


  /**
   * Calculates and caches the result of adding the squared natural numbers until the requested number. If the
   * calculation has already been performed, the result is recalled from the cache.
   * @return {number} The sum of squares;
   */
  SumOfSquares.prototype.calculate = function() {
    var index, previousValue;

    // if we haven't calculated the sum before, do it now
    if (!SumOfSquares.sumCache[this.number]) {

      index = SumOfSquares.sumCache.length;

      // we haven't calculated this before so lets start
      for (index; index <= this.number; index++) {
        // calculate the previous value
        previousValue = index > 0 ? SumOfSquares.sumCache[index - 1] : 0;

        // set the new index equal to the previous sum plus the new index squared
        SumOfSquares.sumCache.push(previousValue + Math.pow(index, 2));
      }

    }

    // return the sum of squares
    return SumOfSquares.sumCache[this.number];

  };

  return SumOfSquares;
}));