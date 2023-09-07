import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: [true, "Please provide location name"],
      maxlength: 30,
      unique: true,
    },
    isLocationActive: {
      type: Boolean,
      default: false,
    },
    locationCloseDate: {
      type: String,
      required: [true, "Please provide a date"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Location", LocationSchema);
