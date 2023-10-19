// routes/notificationRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Notification = require('../models/notificationModel');

const router = express.Router();

// Route to get notifications for the current user
router.get('/notifications', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id, isRead: false });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark a notification as read
router.put('/notifications/mark-read/:notificationId', protect, async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
