var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var muniBussesSchema = new Schema({
  id: String,
  trip_id: String,
  lon: Number,
  lat: Number,
  stop_id: String,
  trip_headsign: String,
  route_short_name: String,
  route_long_name: String
});

console.log('muniBusses', muniBussesSchema);
var muniBusses = mongoose.model('muniBusses', muniBussesSchema);

module.exports = muniBusses;
