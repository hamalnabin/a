import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schoolSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: [true, 'School ID is required'],
    unique: true,
    trim: true,
  },
  schoolName: {
    type: String,
    required: [true, 'School name is required'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
}, {
  timestamps: true,
});

// Pre-save hook to hash password
schoolSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check password
schoolSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const School = mongoose.model('School', schoolSchema);

export default School;
