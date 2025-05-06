const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Store emailId in lowercase
    trim: true,
  },
  password: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
});


// Optional: Add a pre-save hook to ensure password is hashed (if not already hashed)
teacherSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const bcrypt = require('bcrypt');
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Teacher', teacherSchema);