import React, { useState, useEffect } from 'react';
import "../styles/sidebar.css";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmpSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // to track the current path

    // State to track active tab, initialized from current URL or from localStorage
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeEmpTab') || location.pathname);

    useEffect(() => {
        // Set the active tab in localStorage whenever it changes
        localStorage.setItem('activeEmpTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        // Update the active tab when the location changes (due to navigation)
        setActiveTab(location.pathname);
    }, [location.pathname]);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        toast.success("Logged out");
        navigate("/");
    };

    // Handle tab click and update activeTab state
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        navigate(tab); // Use navigate to programmatically change route
    };

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">JMAN</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 mt-4 align-items-center align-items-sm-start" id="menu">
                    <li>
                        <button
                            className={`nav-link px-0 align-middle btn ${activeTab === '/employee' ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick('/employee')}>
                            <i className="fs-5 bi bi-clipboard-pulse" style={{ color: activeTab === '/employee' ? '#ff6196' : '' }}></i>
                            <span className="fs-5 ms-1 d-none d-sm-inline li-style" style={{ color: activeTab === '/employee' ? '#ff6196' : '' }}>Dashboard</span>
                        </button>
                    </li>
                    <li>
                        <button
                            className={`nav-link px-0 align-middle btn ${activeTab === '/employee/feedback' ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick('/employee/feedback')}>
                            <i className="fs-5 bi bi-file-earmark-spreadsheet"></i>
                            <span className="fs-5 ms-1 d-none d-sm-inline li-style">Feedback</span>
                        </button>
                    </li>
                </ul>
                <hr />
                <div className="mt-5 pb-4">
                    <button type="button" className="btn w-auto" style={{ color: "White" }} onClick={handleLogOut}>
                        Logout<i className="ms-5 bi bi-arrow-bar-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmpSidebar;
