/* global SDS, Backbone, $, _ */

SDS.TableRowView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template([
    '<td><%= number %></td>',
    '<td><%= value %></td>',
    '<td><%= datetime %></td>',
    '<td><% if (typeof(occurrences) != "undefined") { %><%= occurrences %></td><% } %>'
  ].join('')),

  className: 'visible',

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});