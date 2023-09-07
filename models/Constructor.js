import mongoose from "mongoose";

const ConstructorSchema = new mongoose.Schema(
  {
    constructorName: {
      type: String,
      required: [true, "Please provide constructor name"],
      maxlength: 30,
      unique: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Constructor", ConstructorSchema);
