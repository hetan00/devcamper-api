const express = require('express')
//import express from 'express'
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp} = require('../controllers/bootcamps')
// import {
//   getBootcamps,
//   getBootcamp,
//   createBootcamp,
//   updateBootcamp,
//   deleteBootcamp
// } from '../controllers/bootcamps.js'

const router = express.Router()

router.route('/').get(getBootcamps).post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)


module.exports = router
//export default router