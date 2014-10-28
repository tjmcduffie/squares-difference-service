var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

/**
 * Difference Schema
 * @type {mongoose.Schema}
 */
var DifferenceSchema = new Schema({
  number: {type: Number, index: true},
  value: Number,
  createdOn: {type: Date, 'default': Date.now},
  occurrences: Number
});


DifferenceSchema.set('toObject', {
  getters: true,
  transform: function(doc, ret, options) {
    // console.log(ret.createdOn);
    ret.datetime = moment(ret.createdOn).format('YYYY-MM-DD, HH:mm:ss'),
    delete ret.createdOn
    delete ret._id;
    delete ret.id
    delete ret.__v
  }
});

DifferenceSchema.statics = {
  findOneByNumber : function(number, callback) {
    this.findOne({'number': number})
      .exec(callback);
  }
};

mongoose.model('Difference', DifferenceSchema);