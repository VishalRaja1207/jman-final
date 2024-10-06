const express = require('express')
const router = express.Router();
const {
    getTrainerFeedback,
    updateEmployeeFeedback
} = require("../controllers/employee")

router.route("/feedback").get(getTrainerFeedback).put(updateEmployeeFeedback)

module.exports = router