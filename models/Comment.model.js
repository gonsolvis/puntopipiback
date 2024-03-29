const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    imageUrl: String,
    toilet: { type: Schema.Types.ObjectId, ref: "Toilet" }
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
