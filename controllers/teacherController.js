const bcrypt = require('bcrypt');
const Teacher = require('../models/Teacher');

exports.loginTeacher = async (req, res) => {
  let { emailId, password } = req.body;
  try {
    if (!emailId || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Convert emailId to lowercase
    emailId = emailId.toLowerCase();
    //console.log('Attempting login for:', emailId); // Debug
    const teacher = await Teacher.findOne({ emailId });
    if (!teacher) {
     // console.log('Teacher not found for:', emailId); // Debug
      return res.status(401).json({ success: false, message: 'Invalid credentials (email not found)' });
    }

    //console.log('Stored password hash:', teacher.password); // Debug 
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
    //  console.log('Password mismatch for:', emailId, 'Provided password:', password); // Debug
      return res.status(401).json({ success: false, message: 'Invalid credentials (password mismatch)' });
    }

    res.status(200).json({ success: true, message: 'Login successful', teacherId: teacher.emailId });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.signupTeacher = async (req, res) => {
  let { emailId, password, name } = req.body;
  try {
    if (!emailId || !password || !name) {
      return res.status(400).json({ success: false, message: 'Email, password, and name are required' });
    }

    emailId = emailId.toLowerCase();
    const existingTeacher = await Teacher.findOne({ emailId });
    if (existingTeacher) {
      return res.status(400).json({ success: false, message: 'Teacher already exists' });
    }

    // No need to hash password here; pre-save hook in Teacher.js handles it
    const teacher = new Teacher({ emailId, password, name });
    await teacher.save();

    res.status(201).json({ success: true, message: 'Teacher created' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password'); // Exclude password field
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
