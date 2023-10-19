const express = require('express');
const router = express.Router();

const {} = require('../controllers/freewashRoutesController');



router.get('/requests/pending') 

// Route to get pending free wash requests (for staff)
// router.get('/requests/pending', protect, staffAuth, async (req, res) => {
//   try {
//     const pendingRequests = await FreeWashRequest.find({ status: 'pending' }).populate('user');
//     res.json(pendingRequests);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Route to request a free wash (for users)
// router.post('/request-free-wash', protect, async (req, res) => {
//     try {
//       const userId = req.user._id; // Get the user's ID from the authenticated request
  
//       // Check if the user is eligible for a free wash (you can add your eligibility logic here)
  
//       if (userIsEligibleForFreeWash) {
//         // Create a new FreeWashRequest document in the database
//         const request = await FreeWashRequest.create({
//           user: userId,
//         });
  
//         res.status(201).json({ message: 'Free wash request created' });
//       } else {
//         res.status(400).json({ message: 'User is not eligible for a free wash' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  

// // Route to approve a free wash request
// router.put('/requests/approve/:requestId', protect, staffAuth, async (req, res) => {
//     try {
//       const { requestId } = req.params;
//       const request = await FreeWashRequest.findById(requestId).populate('user');
  
//       if (!request) {
//         return res.status(404).json({ message: 'Request not found' });
//       }
  
//       request.status = 'approved';
//       await request.save();
  
//       // Create a notification for the user
//       await Notification.create({
//         user: request.user._id,
//         message: 'Your free wash request has been approved.',
//       });
  
//       res.json({ message: 'Request approved' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   // Route to deny a free wash request
//   router.put('/requests/deny/:requestId', protect, staffAuth, async (req, res) => {
//     try {
//       const { requestId } = req.params;
//       const request = await FreeWashRequest.findById(requestId).populate('user');
  
//       if (!request) {
//         return res.status(404).json({ message: 'Request not found' });
//       }
  
//       request.status = 'denied';
//       await request.save();
  
//       // Create a notification for the user
//       await Notification.create({
//         user: request.user._id,
//         message: 'Your free wash request has been denied.',
//       });
  
//       res.json({ message: 'Request denied' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  

module.exports = router;
