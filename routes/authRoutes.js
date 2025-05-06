const express = require('express');
const { signupStudent, loginStudent,getAllStudents } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signupStudent);
router.post('/login', loginStudent);
router.get('/students', getAllStudents);
module.exports = router;
