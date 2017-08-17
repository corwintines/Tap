var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
  username: {type:String, unique:true}.
  email: String,
  hashed_password: String
});

mongoose.model('User', UserSchema);
