const axios = require("axios");
const Patient = require("../models/patient");

const syncPatients = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL, {
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD
      }
    });

    const patients = response.data.result;

    if (!Array.isArray(patients)) {
      return res.status(400).json({
        message: "Invalid API response"
      });
    }

    for (const patient of patients) {
      await Patient.updateOne(
        { id: patient.id },
        { $set: patient },
        { upsert: true }
      );
    }

    res.status(200).json({
      message: "Patients synced successfully",
      count: patients.length
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { syncPatients, getPatients };