const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  registration_id: String,
  patient_name: String,
  gender: String,
  age: mongoose.Schema.Types.Mixed,
  address: String,
  mobile_no: String,
  profile_picture: String,
  date_of_birth: String,
  email: String,
  clinic_id: Number,
  user_id: Number,
  mobile_no_code: String
});

module.exports = mongoose.model("Patient", patientSchema);