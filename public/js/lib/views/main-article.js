/* global SDS, Backbone */

SDS.MainArticleView = Backbone.View.extend({

  tagName: 'article',

  render: function() {

    var calculationsCollection = new SDS.CalculationsCollection();

    var differenceTable = new SDS.TableView({ collection: calculationsCollection });
    var differenceCalculator = new SDS.DifferenceCalculatorView({ collection: calculationsCollection });

    calculationsCollection.fetch({ reset: true });

    this.el.appendChild(differenceCalculator.el);
    this.el.appendChild(differenceTable.el);

    return this;
  }

});