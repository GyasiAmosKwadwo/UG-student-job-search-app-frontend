import { Route, Routes, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Jobs from './pages/Jobs.jsx'
import NotFound from './pages/NotFound.jsx'

// Protected Route and Layouts
import ProtectedRoute from './components/ProtectedRoute.jsx'
import StudentLayout from './layouts/StudentLayout.jsx'
import EmployerLayout from './layouts/EmployerLayout.jsx'

// Student Dashboard Pages
import StudentDashboard from './pages/student/Dashboard.jsx'
import StudentApplications from './pages/student/Applications.jsx'
import StudentProfile from './pages/student/Profile.jsx'

// Employer Dashboard Pages
import EmployerDashboard from './pages/employer/Dashboard.jsx'
import ManageJobs from './pages/employer/ManageJobs.jsx'
import PostJob from './pages/employer/PostJob.jsx'

// Helper component for public pages with Navbar/Footer
const PublicLayout = () => (
  <div className="app">
    <Navbar />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Routes with standard Navbar and Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student" element={<StudentLayout />}>
          {/* Default redirect to dashboard if they hit /student */}
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>
      </Route>

      {/* Employer Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="jobs/manage" element={<ManageJobs />} />
          <Route path="jobs/new" element={<PostJob />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
