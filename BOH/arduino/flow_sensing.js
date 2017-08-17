var request = require('request');

// Arduino Board
var five = require("johnny-five");
var board = new five.Board();
var Sensor = require('./sensor_class');

//  Database
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var url = ''; // ADD URL TO YOUR DATABASE

// Server
var API_ROOT = ''; // ADD URL TO YOUR SERVER

// Pulses
var openSensor = 0;
var closeSensor = 1;

// Checks pulse count and sends data when it needs to.
function pulseCounter(data) {
  data.pulseCount = data.pulseCount + 1;
  if (data.pulseCount%20===0) {
    sendData({
      '_id' : data.id,
      'sensorpin' : data.sensorpin,
      'sensorid' : data.id,
      'pulseCount' : data.pulseCount,
      'amountPoured' : (data.pulseCount * 2.2)/10,
      'kegSize' : data.kegSize,
      'amountLeft' : 100 - (((data.pulseCount*2.2)/10)/data.kegSize)
    });
    console.log(data.sensorpin);
  }
}

// Send data to database function
function sendData(data) {
  var options = {url: API_ROOT+'/update', method:'PUT', json:data};
  console.log(options);

  request({url: API_ROOT+'/update', method:'PUT', json:data}, function(err, res) {
    if (err) {
      console.log(err);
    }
    console.log("No Error");
  });
}

/*
  Each time the sensor is "open" this counts as a pulse. There are 450 pulses in a litre
  so from there we can derive the total amount flowed from the pulse count.
*/
board.on('ready', function() {
  var sensor2 = new five.Sensor.Digital(2);
  var sensor3 = new five.Sensor.Digital(3);
  var sensor4 = new five.Sensor.Digital(4);

  // Declare config objects for sensors
  var sensor2ob = new Sensor('Sensor2', 2);
  var sensor3ob = new Sensor('Sensor3', 3);
  var sensor4ob = new Sensor('Sensor4', 4);

  sensor2.on("change", function(value) {
    if (value === openSensor) {
      pulseCounter(sensor2ob);
    }
  });

  sensor3.on("change", function(value) {
    if (value === openSensor) {
      pulseCounter(sensor3ob);
    }
  });

  sensor4.on("change", function(value) {
    if (value === openSensor) {
      pulseCounter(sensor4ob);
    }
  });
});
