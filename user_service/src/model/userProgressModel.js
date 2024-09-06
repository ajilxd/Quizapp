import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    score: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const progressModel = new mongoose.model("progress", progressSchema);

export default progressModel;
