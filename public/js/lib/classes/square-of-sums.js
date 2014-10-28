/* global define, exports, module */
/* TODO: Abstract out functionality in common with SquareOfSums to make DRYer */

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
        root.SDS.SquareOfSums = factory();
    }
}(this, function () {

  var SquareOfSums = function(number) {
    if (number < SquareOfSums.lowerLimit || number > SquareOfSums.upperLimit) {
      throw new Error('The base number must be between ' + SquareOfSums.lowerLimit + ' and ' +
          SquareOfSums.upperLimit);
    }
    this.number = number;
  };


  /**
   * Lower Limit of calculations
   * @type {Number}
   */
  SquareOfSums.lowerLimit = 0;


  /**
   * Upper Limit of calculations
   * @type {Number}
   */
  SquareOfSums.upperLimit = 100;


  /**
   * Calculation Cache
   * @type {Object}
   */
  SquareOfSums.sumCache = [];


  /**
   * Calculates and caches the result of asquaring the sum of natural numbers until the requested number. If
   * the calculation has already been performed, the result is recalled from the cache.
   * @return {number} The square of sums;
   */
  SquareOfSums.prototype.calculate = function() {
    var index, previousValue;

    // if we haven't calculated the sum before, do it now
    if (!SquareOfSums.sumCache[this.number]) {

      index = SquareOfSums.sumCache.length;

      // we haven't calculated this before so lets start
      for (index; index <= this.number; index++) {
        // calculate the previous value
        previousValue = index > 0 ? SquareOfSums.sumCache[index - 1] : 0;

        // set the new index equal to the previous sum plus the new index squared
        SquareOfSums.sumCache.push(previousValue + index);
      }

    }

    // return the sum of squares
    return Math.pow(SquareOfSums.sumCache[this.number], 2);

  };

  return SquareOfSums;
}));