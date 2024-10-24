import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { deletePerformanceScores, getScores, getTraining } from "../../services/services";

const Scores = () => {
  const [designations, setDesignations] = useState([]);
  const [trainingNames, setTrainingNames] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("Software Engineer");
  const [selectedTraining, setSelectedTraining] = useState(1);
  const [scores, setScores] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch designations and training names on component mount
  useEffect(() => {
    fetchDesignations();
    fetchTrainingNames();
  }, []);

  // Fetch designations from the API
  const fetchDesignations = async () => {
    const data = [
      { designation: "Software Engineer" },
      { designation: "Project Manager" },
      { designation: "HR Manager" },
      { designation: "Data Analyst" },
      { designation: "IT Specialist" },
    ];
    setDesignations(data);
    // Fetch scores for the default selected designation and training after setting designations
    fetchScores(selectedDesignation, selectedTraining);
  };

  // Fetch Training names from the API
  const fetchTrainingNames = async () => {
    const response = await getTraining();
    const data = response.data;
    setTrainingNames(data);
    if (data.length > 0) {
      fetchScores(selectedDesignation, data[0].id);
    }
  };

  // Fetch scores based on selected designation and training
  const fetchScores = async (designation, training) => {
    try {
      const response = await getScores(designation, training);
      const data = response.data;
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  // Handle designation change
  const handleDesignationChange = (event) => {
    const selected = event.target.value;
    setSelectedDesignation(selected);
    fetchScores(selected, selectedTraining); // Fetch scores based on new designation and current training
  };

  // Handle training change
  const handleTrainingChange = (event) => {
    const selected = event.target.value;
    setSelectedTraining(selected);
    fetchScores(selectedDesignation, selected); // Fetch scores based on current designation and new training
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle delete action
  const handleActionDelete = async (e, data) => {
    e.preventDefault();
    try {
      const body_data = { emp_id: data["Employee"].id, training_id: data["Training"].id, score: data["score"] };
      await deletePerformanceScores(body_data["emp_id"], body_data["training_id"])
      fetchScores(selectedDesignation, selectedTraining); // Refresh scores after deletion
    } catch (error) {
      console.log(error);
    }
  };

  //need to change
  // Handle file upload
  const handleClick = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert('Please select a file before uploading');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('training_name', selectedTraining);
  
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/admin/upload/score?id=${selectedTraining}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('File uploaded successfully!');
      setFile(null); // Reset file state
      fileInputRef.current.value = ''; // Clear file input in UI
      fetchScores(selectedDesignation, selectedTraining); // Fetch scores after uploading
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">EMPLOYEE SCORES</h2>
      <div className="row">
        <div className="col-lg-3 mt-3">
          <label htmlFor="designationDropdown" className="form-label">
            Filter by Designation
          </label>
          <select
            className="form-select"
            id="designationDropdown"
            value={selectedDesignation}
            onChange={handleDesignationChange}
          >
            {designations.map((designation, index) => (
              <option key={index} value={designation.designation}>
                {designation.designation}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-3 mt-3">
          <label htmlFor="trainingDropdown" className="form-label">
            Filter by Trainings
          </label>
          <select
            className="form-select"
            id="trainingDropdown"
            value={selectedTraining}
            onChange={handleTrainingChange}
          >
            {trainingNames.map((training, index) => (
              <option key={training.id} value={training.id}>
                {training.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-3 mt-3">
        <label htmlFor="fileUpload" className="form-label">
            Upload File
          </label>
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              id="fileUpload"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="col-lg-3 mt-3">
        <label htmlFor="importData" className="form-label">
            Import
          </label>
          <div>
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center justify-content-center w-50"
              style={{ backgroundColor: "#FF6196" }}
              onClick={handleClick}
            >
              <span style={{float: "left"}}>Import</span>
              <i className="bi bi-arrow-up ms-2"></i>
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Training Start Date</th>
                <th>Training End Date</th>
                <th>Score</th>
                <th>Delete test</th>
              </tr>
            </thead>
            <tbody>
              {scores.length > 0 ? (
                scores.map((score, index) => (
                  <tr key={index}>
                    <td>{score.Employee.name}</td>
                    <td>{new Date(score.Training.start_date).toLocaleDateString()}</td>
                    <td>{new Date(score.Training.end_date).toLocaleDateString()}</td>
                    <td>{score.score}</td>
                    <td>
                      <i className="bi bi-trash3-fill" style={{ cursor: "pointer" }} onClick={(e) => handleActionDelete(e, score)}></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No scores available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-3"></div>
    </div>
  );
};

export default Scores;
