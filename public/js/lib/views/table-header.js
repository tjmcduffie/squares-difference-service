/* global SDS, Backbone, $, _ */

SDS.TableHeaderView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template([
    '<th>Requested Base</th>',
    '<th>Difference</th>',
    '<th>Datetime of Request</th>',
    '<th>Number of occurrences are time of request</th>'
  ].join('')),

  render: function() {
    $(this.el).html(this.template());
    return this;
  }

});