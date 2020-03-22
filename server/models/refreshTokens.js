const mongoose = require("mongoose")
const { Schema } = mongoose

const refreshSchema = new Schema({
  refresh_tokens: { type: String, ref: "User" }
})

module.exports = mongoose.model("Refresh", refreshSchema)
