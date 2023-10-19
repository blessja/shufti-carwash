const { protect, staffAuth } = require('../middleware/authMiddleware');
const FreeWashRequest = require('../models/freewashModel');
const User = require('../models/user');
const Notification = require('../models/notificationModel'); // Import the Notification model


//get pending free wash requests (for staff)
const getPendingFreeWashRequests = async (req, res) => {
    try {
        const requests = await FreeWashRequest.find({ status: 'pending' }).populate('user');
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}




module.exports = {
    getPendingFreeWashRequests
    // acceptFreeWashRequest,
    // rejectFreeWashRequest
}


