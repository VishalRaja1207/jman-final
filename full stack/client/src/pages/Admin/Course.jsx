import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import "../../styles/sidebar.css";

const Course = () => {
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Rows per page can be set here
  const [updateCard, setUpdateCard] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Number of total pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/admin/training"
      );
      const data = response.data;
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (e, data) => {
    try {
      e.preventDefault();
      setUpdateData(data);
      setUpdateCard(true);
      const response = await axios.put(
        `http://localhost:5000/api/v1/admin/training>id=${data.id}`,
        { name: data.name, end_date: data.end_date }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2 className="my-4">ADD TRAINING</h2>
      <div className="row">
        <form className="row">
          <div className="col-lg-3 mt-3">
            <label htmlFor="exampleInputEmail1">
              Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter course name"
            />
          </div>

          <div className="col-lg-3 mt-3">
                <label htmlFor="exampleInputPassword1">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                //   value={updateData.end_date}
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
          </div>
          <div className="col-lg-3 mt-3">
                <label htmlFor="exampleInputPassword1">End Date</label>
                <input
                  type="date"
                  className="form-control"
                //   value={updateData.end_date}
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
          </div>

          <div className="col-lg-3 mt-3">
            <label htmlFor="exampleInputPassword1">
              Add
            </label>
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center justify-content-center w-50"
              style={{ backgroundColor: "#FF6196" }}
            //   onClick={handleClick}
            >   Submit
                </button>
          </div>
        </form>
      </div>
      <div className="row mt-5">
        <div className="col">
          <div className="card item-card custom-card">
            <div className="card-header">
              <h6 style={{ textAlign: "center" }}>
                <b>Training courses</b>
              </h6>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit</th>
                  <th>Delete </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.start_date}</td>
                    <td>{data.end_date}</td>
                    <td onClick={(e) => handleUpdate(e, data)}>
                      <i class="bi bi-pencil-fill" style={{cursor: "pointer"}}></i>
                    </td>
                    <td>
                      <i className="bi bi-trash3-fill" style={{cursor: "pointer"}}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <Pagination className="ms-5">
              <Pagination.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  active={index + 1 === currentPage}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      </div>
      {updateCard && (
          <div className="custom-popup-card-overlay">
            <div className="card custom-popup-card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Update Course</h5>
                <i className="bi bi-x-lg" style={{ cursor: "pointer" }} onClick={() => setUpdateCard(false)}></i>
            </div>
            <br></br>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={updateData.name}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={updateData.start_date}
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={updateData.end_date}
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary w-100" >
                Update
              </button>
            </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default Course;
