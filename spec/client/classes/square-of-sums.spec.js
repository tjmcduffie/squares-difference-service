/* global describe, it, expect, SDS */

describe('Square of sums', function() {

  it('Should calculate the square of the sum of natural numbers through n', function() {
    expect(function() {  new SDS.SquareOfSums(10);  }).not.toThrow();
    expect( new SDS.SquareOfSums(10).calculate() ).toEqual(3025);
    expect( new SDS.SquareOfSums(50).calculate() ).toEqual(1625625);
    expect( new SDS.SquareOfSums(98).calculate() ).toEqual(23532201);
  });

  it('Should not try calculating numbers above the upper limit', function() {
    expect(function() {  new SDS.SquareOfSums(100);  }).not.toThrow();
    expect(function() {  new SDS.SquareOfSums(101);  }).toThrow();
    expect(function() {  new SDS.SquareOfSums(500);  }).toThrow();
    expect(function() {  new SDS.SquareOfSums(1000);  }).toThrow();
  });

  it('Should not try calculating numbers below the lower limit', function() {
    expect(function() {  new SDS.SquareOfSums(0);  }).not.toThrow();
    expect(function() {  new SDS.SquareOfSums(-1);  }).toThrow();
    expect(function() {  new SDS.SquareOfSums(-10);  }).toThrow();
    expect(function() {  new SDS.SquareOfSums(-100);  }).toThrow();
  });
});