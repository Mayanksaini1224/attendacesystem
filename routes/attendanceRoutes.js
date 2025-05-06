const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/submit', attendanceController.submitAttendance);
router.get('/requests', attendanceController.getAttendanceRequests);
router.put('/update/:id', attendanceController.updateAttendanceStatus);
router.get('/allstatus', attendanceController.getAllAttendance); 
router.get('/college/:collegeId', attendanceController.getAttendanceByCollegeId);

module.exports = router;