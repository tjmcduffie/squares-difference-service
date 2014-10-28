/* global SDS, Backbone, $, _ */

SDS.IntroView = Backbone.View.extend({
  initialize: function( ) {
    this.render();
  },
  template: _.template('<p></p>'),
  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});