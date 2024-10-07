import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import "../styles/sidebar.css"

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
          const response = await axios.get("http://localhost:5000/api/v1/admin/training");
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
            const response = await axios.put(`http://localhost:5000/api/v1/admin/training>id=${data.id}`, {name: data.name, end_date: data.end_date});
            console.log(response.data);
             
        } catch (error) {
            console.log(error);
        }
      }
    return (
        <div className="container-fluid">
            <div className="row">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="row">
                <div className='col'>
                    <div className="card item-card custom-card">
                        <div className='card-header'>
                            <h6 style={{textAlign: "center"}}><b>Training courses</b></h6>
                        </div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Edit</th>
                                <th>Delete  </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentRows.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.start_date}</td>
                                    <td>{data.end_date}</td>
                                    <td onClick={(e) => handleUpdate(e, data)}><i class="bi bi-pencil-fill"></i></td>
                                    <td><i className="bi bi-trash3-fill"></i></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <Pagination className='ms-5'>
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
                        </Pagination>
                    </div>
                </div>
            </div>
            {updateCard && ( 
                <div className="custom-card-overlay">
                    <div className="card item-card custom-card1">
                        <div className='card-header'>
                            <h6 style={{textAlign: "center"}}><b>Update courses</b> <i className="bi bi-x-lg" onClick={() => setUpdateCard(false)}></i></h6>
                        </div>
                        <br></br>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="email" className="form-control" onChange={(e) => setName(e.target.value)} value={updateData.name} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">End Date</label>
                                <input type="date" className="form-control" value = {updateData.end_date} id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Course;