const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
  {
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
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
