import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import Scores from './pages/Admin/Scores';
import Performance from './pages/Admin/Performance';
import Course from './pages/Course';
import Login from './pages/Login';
import { RequiredAuth } from './utils/RequiredAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Employee from './pages/Employee/Employee';
import EmpSidebar from './components/EmpSidebar';
import Feedback from './pages/Employee/Feedback';

function Layout() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar /> {/* Fixed Sidebar */}
        <div className="col content-container">
          <Outlet /> {/* Outlet to render the main content */}
        </div>
      </div>
    </div>
  );
}

function EmpLayout() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <EmpSidebar></EmpSidebar> {/* Fixed Sidebar */}
        <div className="col content-container">
          <Outlet /> {/* Outlet to render the main content */}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<EmpLayout />}>
          <Route path = "/employee" element = {<Employee />} />
          <Route path='/employee/feedback' element = {<Feedback />} />
        </Route>
        <Route element={<Layout />}> {/* Use Layout to apply Sidebar */}
          <Route path="/dashboard" element={<RequiredAuth><Dashboard /></RequiredAuth>} />
          <Route path="/scores" element={<RequiredAuth><Scores /></RequiredAuth>} />
          <Route path="/performance" element={<RequiredAuth><Performance /></RequiredAuth>} />
          <Route path="/add/course" element={<RequiredAuth><Course /></RequiredAuth>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
