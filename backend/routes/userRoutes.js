const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
  getUsersByCarWash,
  washCar,
  getUserProfile,
  updateUserProfile,
  getUserWashHistory
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { updateWashHistory } = require('../controllers/washController');

router.get('/:id', getUserById);
router.post('/:carwash_id/register', registerUser);
router.post('/:carwash_id/login', loginUser) // Login user to a specific car wash
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getUsers);
router.get('/carwashes/:carwashId/users', getUsersByCarWash);
// router.post('/:id/wash', washCar, protect, updateWashHistory);
// router.post('/:id/wash', protect, washCar, updateWashHistory);
router.post('/:id/wash', washCar, protect, updateWashHistory);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/me').get(protect, getMe);
router.get('/:id/wash-history', getUserWashHistory);
module.exports = router;
