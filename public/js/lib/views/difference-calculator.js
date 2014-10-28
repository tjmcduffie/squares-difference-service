/* global SDS, Backbone, $, _, alert */

SDS.DifferenceCalculatorView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.form = $(this.el).find('form');
  },

  template: _.template([
    '<form method="get" action="http://localhost:8080/difference">',
      '<label>Base number for calculations: <input name="number" type="text" value=""></label>',
      '<input type="submit" value="Calculate">',
    '</form>'
  ].join('')),

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var action = this.form[0].action;
    var number = this.form.find('input[name="number"]')[0];

    if (!number.value) {
      alert('You must enter a number to calculate the difference.');
      return;
    }

    $.getJSON(action + '?' + number.name + '=' + number.value, this.handleGetSuccess.bind(this));

    // Alternate implementation would be to do the sum difference calculation here
    // and use the collection to calculate the number of occurrences in the current session.
    // The data could persist to the server via a simple service, but that would create a different
    // interaction and application that described.
  },

  handleGetSuccess: function(data) {
    console.log('foo', data);
    this.collection.unshift(data);
    this.form[0].reset();
  }

});