import React, { useEffect, useState } from "react";
import Barchart from "../../charts/Barchart";
import Piechart from "../../charts/Piechart";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import {
  getDashBarData,
  getDashPieData,
  getDashTableData,
  getRetentionData,
} from "../../services/services";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [topPerformer, setTopPerformer] = useState("");
  const [topCourse, setTopCourse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(15); // Rows per page can be set here
  const [retentionData, setRetentionData] = useState("");

  useEffect(() => {
    fetchTableData();
    fetchBarData();
    fetchPieData();
    fetchRetentionData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await getDashTableData();
      const data = response.data;
      setTableData(data);
      setTopPerformer(data[0].Name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBarData = async () => {
    try {
      const response = await getDashBarData();
      const data = response.data;
      setBarData(data);
      setTopCourse(data[0].Name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPieData = async () => {
    try {
      const response = await getDashPieData();
      const data = response.data;
      setPieData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRetentionData = async () => {
    try {
      const response = await getRetentionData();
      const data = response.data["data"];
      setRetentionData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Get the current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Number of total pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col text-end">
          <div className="card item-card custom-card w-auto">
            <div
              className="card-header"
              style={{ backgroundColor: "#19105B", color: "#fff" }}
            >
              <h5 className="mb-0">Overview</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div
                  className="col-md-4 custom-col text-center"
                  style={{ borderRight: "4px solid #19105B" }}
                >
                  <p>Top Performer</p>
                  <b>
                    <p>
                      <span>{topPerformer}</span>
                    </p>
                  </b>
                </div>
                <div
                  className="col-md-4 custom-col text-center"
                  style={{ borderRight: "4px solid #FF6196" }}
                >
                  <p>Top Course</p>
                  <b>
                    <p>
                      <span>{topCourse}</span>
                    </p>
                  </b>
                </div>
                <div
                  className="col-md-4 custom-col text-center"
                  style={{ borderRight: "4px solid #71EAE1" }}
                >
                  <p>Rentention</p>
                  <b>
                    <p>
                      <span>{retentionData}%</span>
                    </p>
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="row mt-5">
            <div className="col">
              <div className="card item-card custom-card">
                <Barchart header="" data={barData}></Barchart>
              </div>
              <div className=""></div>
            </div>
            {/* <div className='col-lg-6'>
                        <div className="card item-card custom-card">
                            <div className='card-header'>
                                <h6 style={{textAlign: "center"}}><b>Employee cummulative scores</b></h6>
                            </div> */}
            {/* <table className="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Percentage</th>
                                    <th>No of trainings</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentRows.map((emp) => (
                                    <tr key={emp.id}>
                                    <td>{emp.Name}</td>
                                    <td>{emp.Designation}</td>
                                    <td>{emp.Percentage}</td>
                                    <td>{emp["Total Trainings"]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table> */}

            {/* Pagination */}
            {/* <Pagination className='ms-5'>
                                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                                {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    active={index + 1 === currentPage}
                                >
                                    {index + 1}
                                </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                                <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                            </Pagination> */}
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="row mt-5">
            <div className="col">
              <div className="card item-card custom-card">
                <Piechart header="Scores by training" data={pieData}></Piechart>
              </div>
            </div>
            {/* <div className='col-lg-6'>
                        <div className="card item-card custom-card">
                            <Piechart header = "Scores by training" data ={pieData}></Piechart> 
                        </div>
                    </div> */}
          </div>
        </div>
        <div className="col mt-5">
          <div className="card item-card custom-card">
            <div className="card-header">
              <h6 style={{ textAlign: "center" }}>
                <b>Employee cummulative scores</b>
              </h6>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Percentage</th>
                  <th>No of trainings</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.Name}</td>
                    <td>{emp.Designation}</td>
                    <td>{emp.Percentage}</td>
                    <td>{emp["Total Trainings"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination className="ms-5">
              <Pagination.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
                style={{ color: "#19105B" }}
              />
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ color: "#19105B" }}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  active={index + 1 === currentPage}
                  style={{
                    color: "#19105B",
                    backgroundColor:
                      index + 1 === currentPage ? "#E6E6FA" : "transparent", // Optional for the active page
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ color: "#19105B" }}
              />
              <Pagination.Last
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
                style={{ color: "#19105B" }}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
