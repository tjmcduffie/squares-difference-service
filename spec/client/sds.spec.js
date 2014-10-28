/* global describe, it, expect, SDS */

describe('The SDS framework', function() {

  it('should have a single point of entry to initialize the app', function() {
    expect(function() {  SDS.init();  }).not.toThrow();
  });
});