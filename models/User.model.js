const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: 2,
      maxlength: 50
    },
    imageUrl: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  

    toilets: [{ type: Schema.Types.ObjectId, ref: "Toilet" }]

    //favourites
  },
   
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
