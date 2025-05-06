const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/login', teacherController.loginTeacher);
//  For admin to create teachers and fetch teachers
router.post('/signup', teacherController.signupTeacher);
router.get('/allteacher', teacherController.getAllTeachers); // New route

module.exports = router;