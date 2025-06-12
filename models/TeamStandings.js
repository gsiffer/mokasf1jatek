import mongoose from "mongoose";

// Define the schema for an individual item
const itemSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Constructor",
    required: [true, "Please provide team id"],
  },
  teamName: {
    type: String,
    required: [true, "Please provide team name"],
  },
  point: {
    type: Number,
    required: [true, "Please provide point value"],
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

// Pre-save middleware to update locationName to lowercase
TeamStandingsSchema.pre("save", function () {
  // Lowercase activeLocationName
  this.activeLocationName = this.activeLocationName.toLowerCase();

  // Lowercase locationName in items array
  this.items.forEach((item) => {
    item.teamName = item.teamName.toLowerCase();
  });
});

// Middleware to lowercase locationName on findOneAndUpdate
TeamStandingsSchema.pre("findOneAndUpdate", function () {
  // Lowercase activeLocationName if it is being updated
  if (this._update.activeLocationName) {
    this._update.activeLocationName =
      this._update.activeLocationName.toLowerCase();
  }

  // Lowercase locationName in items array if it is being updated
  if (this._update.items) {
    this._update.items.forEach((item) => {
      if (item.teamName) {
        item.teamName = item.teamName.toLowerCase();
      }
    });
  }
});

export default mongoose.model("TeamStandings", TeamStandingsSchema);
