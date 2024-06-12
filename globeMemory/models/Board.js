const mongoose = require("mongoose");
const { Schema } = mongoose;

const boardSchema = new Schema({
  name: {type: String, required: true},
  created_by: {type: Schema.Types.ObjectId, ref:'User', required: true},
  shared_to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date_creation: { type: Date, default: Date.now },
  image_link:[{ type: String }]
});

module.exports = mongoose.model('Board', boardSchema);