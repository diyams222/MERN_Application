const express = require("express");
const router = express.Router();

const {
  syncPatients,
  getPatients
} = require("../controllers/patientController");

router.post("/sync", syncPatients);

router.get("/", getPatients);

module.exports = router;