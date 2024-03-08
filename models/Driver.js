import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      maxlength: 30,
    },
    teamName: {
      type: String,
      required: [true, "Please provide team name"],
      maxlength: 30,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

// Use a combination of three unique properties and a compound index in your Mongoose schema
DriverSchema.index(
  { firstName: 1, lastName: 1, teamName: 1 },
  { unique: true }
);

// Pre-save middleware to update constructorNameLower
DriverSchema.pre("save", function () {
  this.firstName = this.firstName.toLowerCase();
  this.lastName = this.lastName.toLowerCase();
  this.teamName = this.teamName.toLowerCase();
});

export default mongoose.model("Driver", DriverSchema);
