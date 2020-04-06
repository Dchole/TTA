const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    max: 225
  },
  status: {
    type: Schema.Types.Boolean,
    default: false
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  expTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    max: 500
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Task", taskSchema)
