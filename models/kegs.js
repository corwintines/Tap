var mongoose = require('mongoose');

var kegsSchema = mongoose.Schema({
  _id : {type:String, required:true},
  beername : {type:String, required:true},
  brewery : {type:String, required:true},
  beertype : {type:String, required:true},
  alcoholpercent : {type:Number, required:true},
  description : {type:String, required:true},
  kegsize : {type:Number, required:true},
  amountpoured : {type:Number, required:true},
  waste : {type:Number},
  glassespoured : {type:Number},
  amountleft : {type:Number},
  pulsecount : {type:Number}
});

var Keg = module.exports = mongoose.model('Keg', kegsSchema);

// // GET
// module.exports.getKegs = function(callback, limit) {
//   Keg.find(callback).limit(limit);
// }

// POST
module.exports.addKegs = function(keg, callback) {
  Keg.create(keg, callback);
}

// PUT

// POST
