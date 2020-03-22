const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 60
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  registered_date: {
    type: Date,
    default: Date.now
  },
  refresh_tokens: [{ type: String }]
})

module.exports = mongoose.model("User", userSchema)
