var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  athlete_id: String,
  login_code: String,
  token: String,
  athlete_name: String,
  profile_pic: String,
  register_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('kayouhUsers', UserSchema); // 1st param is collection name