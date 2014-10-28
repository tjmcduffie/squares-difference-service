/* global describe, it, expect, SDS */

describe('Sum of Squares', function() {

  it('Should calculate the sum of natural numbers squared through n', function() {
    expect(function() {  new SDS.SumOfSquares(10);  }).not.toThrow();
    expect( new SDS.SumOfSquares(10).calculate() ).toEqual(385);
    expect( new SDS.SumOfSquares(50).calculate() ).toEqual(42925);
    expect( new SDS.SumOfSquares(98).calculate() ).toEqual(318549);
  });

  it('Should not try calculating numbers above the upper limit', function() {
    expect(function() {  new SDS.SumOfSquares(100);  }).not.toThrow();
    expect(function() {  new SDS.SumOfSquares(101);  }).toThrow();
    expect(function() {  new SDS.SumOfSquares(500);  }).toThrow();
    expect(function() {  new SDS.SumOfSquares(1000);  }).toThrow();
  });

  it('Should not try calculating numbers below the lower limit', function() {
    expect(function() {  new SDS.SumOfSquares(0);  }).not.toThrow();
    expect(function() {  new SDS.SumOfSquares(-1);  }).toThrow();
    expect(function() {  new SDS.SumOfSquares(-10);  }).toThrow();
    expect(function() {  new SDS.SumOfSquares(-100);  }).toThrow();
  });
});