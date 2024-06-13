const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password : {type: String, required: true},
  last_name: {type: String},
  first_name: {type: String}
});

module.exports = mongoose.model('User', userSchema);