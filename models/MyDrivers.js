import mongoose from "mongoose";

const MyDriversSchema = new mongoose.Schema(
  {
    locationName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "Please provide location name"],
    },
    driver1: {
      type: String,
      required: [true, "Please provide a driver"],
      maxlength: 50,
    },
    driver2: {
      type: String,
      required: [true, "Please provide a driver"],
      maxlength: 50,
    },
    driver3: {
      type: String,
      required: [true, "Please provide a driver"],
      maxlength: 50,
    },
    driver4: {
      type: String,
      required: [true, "Please provide a driver"],
      maxlength: 50,
    },
    driver5: {
      type: String,
      required: [true, "Please provide a driver"],
      maxlength: 50,
    },
    teamName: {
      type: String,
      required: [true, "Please provide a team"],
      maxlength: 40,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

// Pre-save middleware to update constructorNameLower
MyDriversSchema.pre("save", function () {
  this.driver1 = this.driver1.toLowerCase();
  this.driver2 = this.driver2.toLowerCase();
  this.driver3 = this.driver3.toLowerCase();
  this.driver4 = this.driver4.toLowerCase();
  this.driver5 = this.driver5.toLowerCase();
  this.teamName = this.teamName.toLowerCase();
});

export default mongoose.model("MyDrivers", MyDriversSchema);
