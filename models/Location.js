import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const LocationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: [true, "Please provide location name"],
      maxlength: 30,
      unique: "Location name has to be unique",
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

// Apply the unique validator plugin to the schema
LocationSchema.plugin(uniqueValidator);

// Pre-save middleware to update constructorNameLower
LocationSchema.pre("save", function () {
  this.locationName = this.locationName.toLowerCase();
});

// Middleware to lowercase locationName on findOneAndUpdate
LocationSchema.pre("findOneAndUpdate", function () {
  if (this._update.locationName) {
    this._update.locationName = this._update.locationName.toLowerCase();
  }
});

export default mongoose.model("Location", LocationSchema);
