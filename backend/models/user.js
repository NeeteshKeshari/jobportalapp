const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ["jobseeker", "employer", "admin"], default: "jobseeker" },
  phone: { type: String },
  profilePic: { type: String }, // Cloudinary/S3 link
  resume: { type: String }, // link to uploaded file
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
