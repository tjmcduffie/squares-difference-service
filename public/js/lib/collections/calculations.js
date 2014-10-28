/* global SDS, Backbone */

SDS.CalculationsCollection = Backbone.Collection.extend({

  model: SDS.CalculationModel,

  url: 'http://localhost:8080/differences/25'

});