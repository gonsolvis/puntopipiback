const { Schema, model } = require("mongoose");

const toiletSchema = new Schema({
  title: String,
  description: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  imageUrl: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
}, {
  timestamps: true
});

module.exports = model("Toilet", toiletSchema);
