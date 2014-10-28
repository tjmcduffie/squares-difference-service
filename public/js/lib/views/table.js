/* global SDS, Backbone, $ */

SDS.TableView = Backbone.View.extend({

  initialize: function() {
    this.collection.bind('reset', this.render, this);
    this.collection.bind('add', this.renderNew, this);
    this.collection.bind('remove', this.render, this);
  },

  tagName: 'table',

  className: 'table table-bordered table-striped',

  render: function() {
    var rows = [];
    var header = new SDS.TableHeaderView();

    rows.push(header.render().el);
    this.collection.each(function(item) {
      var row = new SDS.TableRowView({ model: item });
      rows.push(row.render().el);
    });

    $(this.el).html(rows);

    return this;
  },

  renderNew: function() {

    var row = new SDS.TableRowView({ model: this.collection.models[0] });
    var $row = $(row.render().el);
    $row.addClass('fade-in').insertAfter($(this.el).find('tr:first-child'));
    setTimeout(function() {
      $row.removeClass('fade-in');
    }, 0);

    return this;
  }

});