const express = require('express')

const { protect, authorize } = require('../middleware/auth')

const {
    getUsers, getUser, createUser, updateUser, deleteUser
} = require('../controllers/users.js')

const User = require('../models/User')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })

router.use(protect)
router.use(authorize('admin'))
router.route('/').get(advancedResults(User),getUsers).post(createUser)

//router.route('/').get(getCourses).post(addCourse)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router