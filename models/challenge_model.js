import mongoose from "mongoose";

const challengeSchema = mongoose.Schema({
  
    roomId: { type: String, required: true, trim: true },
    joinedUserA: { type: String, default: "" },
    joinedUserB: { type: String, default: "" },
    winStatus: 
        {
            winUId: { type: String, trim: true },
            status: { type: String, trim: true, default: "na" }
        }
    ,
    createdDate: { type: Date, default: Date.now }
});

const ChallengeModel = mongoose.model('Challenge', challengeSchema);

export default ChallengeModel;
