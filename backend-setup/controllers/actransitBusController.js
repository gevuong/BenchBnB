let actransitBussesModel = require('../models/actransitBussesModel');
let express = require('express');
// let app = express();
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');
let actransitBusModel = require('../models/actransitBussesModel');



let apiArr = ["7cec8694-c386-42b4-870c-a76aef58b40f",
"1e63a81e-0a10-4ef8-991c-ed195c33a855",
"b021f9d5-2fe8-4fd8-90f0-4b8b5807cf51"];

let counter = 0;


let apiToken = () =>{
  if (counter === 2){
    counter = 0;
  } else {
    counter += 1;
  }
  return apiArr[counter];

};

const actransitRequestSettings = {
  method: 'GET',
  url: `https://api.511.org/transit/vehiclepositions?api_key=${apiToken()}&agency=actransit`,
  encoding: null
};

const actransitBusController = function(app) {
  rp(actransitRequestSettings).then(function(arr){
    app.get('/api/actransitBusses', function(req, res) {
      actransitBusModel.remove().exec();
      console.log(actransitRequestSettings);
      let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;
      let actransitArr = [];
      array.forEach(function(entity) {
        actransitArr.push({
          'id': entity.id,
          'trip_id': entity.vehicle.trip.trip_id,
          'lon': entity.vehicle.position.longitude,
          'lat': entity.vehicle.position.latitude,
          'stop_id': entity.vehicle.stop_id
          });
      });
      actransitBussesModel.create(actransitArr, function(err, results){
        if (err) {
          return console.log(err);
        }

        res.send(actransitArr);
      });
    });
  });
};

module.exports = actransitBusController;
