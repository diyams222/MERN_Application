import { useState, useEffect } from "react";
import "./Patient.css";

function Patient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/patients");

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();
      setPatients(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const syncPatients = async () => {
    setSyncing(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/patients/sync",
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sync failed");
      }

      await fetchPatients();
      alert("Patients synced successfully!");

    } catch (error) {
      setError(error.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="container">
      <h1>Patient Management System</h1>

      <button onClick={syncPatients} disabled={loading || syncing}>
        {syncing ? "Syncing..." : "Sync Patients"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Patient List</h2>

      <table>
        <thead>
          <tr>
            <th>Registration ID</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Loading patients...
              </td>
            </tr>
          ) : patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.registration_id || "-"}</td>
                <td>{patient.patient_name || "-"}</td>
                <td>{patient.gender || "-"}</td>
                <td>{patient.age ?? "-"}</td>
                <td>{patient.mobile_no || "-"}</td>
                <td>{patient.address || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Patient;