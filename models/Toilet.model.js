const { Schema, model } = require("mongoose");

const toiletSchema = new Schema({
    title: String,
    description: String,
    address: {
        type: String,
        required: true
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
    imageUrl: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]
 // Location: [Number]

    // OpeningTimes: String,

   
            
        
    
      
});

module.exports = model("Toilet", toiletSchema);
