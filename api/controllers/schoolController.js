import School from '../models/schoolModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/verify.js';
import { errorHandler } from '../utils/error.js';

// Create a new school
export const createSchool = async (req, res) => {
    try {
      const { schoolId, schoolName, email, password } = req.body;
  
      // Check if a school with the same ID or email already exists
      const existingSchool = await School.findOne({ 
        $or: [{ schoolId }, { email }] 
      });
  
      if (existingSchool) {
        // Return an error if a school with the same ID or email is found
        return res.status(400).json({
          message: 'School with the same ID or email already exists',
        });
      }
  
      // Create new school if no duplicate is found
      const school = await School.create({ schoolId, schoolName, email, password });
      res.status(201).json({ message: 'School created successfully', school });
    } catch (error) {
      // Handle any other errors
      res.status(400).json({ message: error.message });
    }
  };
  

// Authenticate school
export const loginSchool = async (req, res) => {
  try {
    const { email, password } = req.body;
    const school = await School.findOne({ email });
    if (!school || !(await school.correctPassword(password, school.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: school._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get a single school by ID
export const getSchoolById = [verifyToken, async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id).select('-password');
    if (!school) return next(errorHandler(404, 'School not found'));
    res.status(200).json(school);
  } catch (error) {
    next(errorHandler(500, 'Error fetching school'));
  }
}];




