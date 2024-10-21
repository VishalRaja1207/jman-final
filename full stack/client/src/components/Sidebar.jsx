import React, { useState, useEffect } from 'react';
import "../styles/sidebar.css";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
 
const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // to track the current path
   
    // State to track active tab, initialized from current URL
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || location.pathname);
   
    useEffect(() => {
        // Set the active tab in localStorage whenever it changes
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);
 
    useEffect(() => {
        // Update the active tab on URL change (when user navigates manually or via history)
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
        <div className="col-auto col-md-3 col-xl-2 px-sm-0 px-0 sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-4 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">JMAN</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 mt-4 align-items-center align-items-sm-start" id="menu">
                    <li>
                        <button
                            className={`nav-link px-0 align-middle btn ${activeTab === '/dashboard' ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick('/dashboard')}>
                            <i className="fs-5 bi bi-clipboard-pulse me-1" style={{ color: activeTab === '/dashboard' ? '#ff6196' : '' }}></i>
                            <span className="fs-5 ms-1 d-none d-sm-inline li-style" style={{ color: activeTab === '/dashboard' ? '#ff6196' : '' }}>Dashboard</span>
                        </button>
                    </li>
                    <li className='mt-2'>
                        <button
                            className={`nav-link px-0 align-middle btn ${activeTab === '/scores' ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick('/scores')}>
                            <i className="fs-5 bi bi-file-earmark-spreadsheet me-1"></i>
                            <span className="fs-5 ms-1 d-none d-sm-inline li-style">Scores</span>
                        </button>
                    </li>
                    <li className='mt-2'>
                        <button
                            className={`nav-link px-0 align-middle btn ${activeTab === '/performance' ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick('/performance')}>
                            <i className="fs-5 bi bi-speedometer me-1"></i>
                            <span className="fs-5 ms-1 d-none d-sm-inline li-style">Performance</span>
                        </button>
                    </li>
                    <li className='mt-2'>
                        <button
                            className={`nav-link px-0 align-middle btn ${activeTab === '/add/course' ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick('/add/course')}>
                            <i className="fs-5 bi bi-book me-1"></i>
                            <span className="fs-5 ms-1 d-none d-sm-inline li-style">Add Training</span>
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
 
export default Sidebar;
 