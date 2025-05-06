const Attendance = require('../models/Attendance');

exports.submitAttendance = async (req, res) => {
  const { studentName, collegeId, latitude, longitude, timestamp, status } = req.body;
  try {
    const attendance = new Attendance({
      studentName,
      collegeId,
      latitude,
      longitude,
      timestamp,
      status,
    });
    await attendance.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAttendanceRequests = async (req, res) => {
  try {
    const requests = await Attendance.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateAttendanceStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getAttendanceByCollegeId = async (req, res) => {
  try {
    const records = await Attendance.find({ collegeId: req.params.collegeId });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
