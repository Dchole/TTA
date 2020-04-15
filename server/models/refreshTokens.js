const mongoose = require("mongoose")
const { Schema } = mongoose

const refreshSchema = new Schema(
  {
    token: {
      type: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Refresh", refreshSchema)
