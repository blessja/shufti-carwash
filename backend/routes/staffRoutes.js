const express = require('express')
const router = express.Router()

const { registerStaff, loginStaff, getStaffData } = require('../controllers/staffController')

router.post('/:carwash_id/register', registerStaff)
router.post('/:carwash_id/login', loginStaff)
router.get('/data', getStaffData)

module.exports = router