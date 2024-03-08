import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ConstructorSchema = new mongoose.Schema(
  {
    constructorName: {
      type: String,
      required: [true, "Please provide constructor name"],
      maxlength: 30,
      unique: "Constructor name has to be unique",
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
ConstructorSchema.plugin(uniqueValidator);

// Pre-save middleware to update constructorNameLower
ConstructorSchema.pre("save", function () {
  this.constructorName = this.constructorName.toLowerCase();
});

export default mongoose.model("Constructor", ConstructorSchema);
