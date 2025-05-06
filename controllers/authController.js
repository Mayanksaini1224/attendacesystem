const Student = require('../models/Student');
const bcrypt = require('bcrypt');

exports.signupStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ message: 'Student registered', studentId: student._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.loginStudent = async (req, res) => {
  let { collegeId, password } = req.body;
  try {
    if (!collegeId || !password) {
      return res.status(400).json({ success: false, message: 'college Id and password are required' });
    }

    // Convert emailId to lowercase
    //emailId = emailId.toLowerCase();
    //console.log('Attempting login for:', emailId); // Debug
    const student = await Student.findOne({ collegeId });
    if (!student) {
     // console.log('Teacher not found for:', emailId); // Debug
      return res.status(401).json({ success: false, message: 'Invalid credentials (collegeId not found)' });
    }

    //console.log('Stored password hash:', teacher.password); // Debug 
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
    //  console.log('Password mismatch for:', emailId, 'Provided password:', password); // Debug
      return res.status(401).json({ success: false, message: 'Invalid credentials (password mismatch)' });
    }

    res.status(200).json({ success: true, message: 'Login successful', collegeId: student.collegeId ,studentName:student.name});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
/*
exports.loginStudent = async (req, res) => {
  const { collegeId, password } = req.body;
  const student = await Student.findOne({ collegeId });
  if (!student || !(await student.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successfuuuuuuul', studentId: student._id });
};
*/

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};