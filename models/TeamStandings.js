import mongoose from "mongoose";

// Define the schema for an individual item
const itemSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: [true, "Please provide location id"],
  },
  locationName: {
    type: String,
    required: [true, "Please provide location name"],
  },
});

const TeamStandingsSchema = new mongoose.Schema(
  {
    activeLocationName: {
      type: String,
      required: [true, "Please provide location name"],
    },
    activeLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "Please provide location id"],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    items: {
      type: [itemSchema],
      required: [true, "Items are required"],
      validate: {
        validator: (v) => v.length > 0,
        message: "Items array cannot be empty",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("TeamStandings", TeamStandingsSchema);
