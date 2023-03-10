const {Schema, model} = require("mongoose");

const toiletSchema = new Schema({
    title: String,
    description: String,
    rating: {
          type: Number,
          min: 1,
          max: 10
        },
    imageUrl: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]


    // OpeningTimes: String,

    // Location: [String}
            
        
    
      
});

module.exports = model("Toilet", toiletSchema);