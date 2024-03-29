const {Schema, model} = require("mongoose");

const toiletSchema = new Schema({
    title: String,
    description: String,
    address: {
        type: String,
      
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },

    rating: {
          type: Number,
          min: 1,
          max: 5
        },
    clean: {
        type: Number,
        min: 1,
        max: 5
    },
    imageUrl: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]

      
},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Toilet", toiletSchema);