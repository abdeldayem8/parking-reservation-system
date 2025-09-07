import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Navbar from './components/Common/Navbar'
import GateDetails from './pages/GateDetails'
import AdminLogin from './pages/AdminLogin'
import AdminEmployees from './pages/AdminEmployees'
import AdminReports from './pages/AdminReports'
import AdminControl from './pages/AdminControl'
import Checkpoint from './pages/checkPoint'
import GatesList from './pages/GatesList'
import { ProtectedRoute } from './components/Auth'

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<GatesList />} />
          <Route path="/gates" element={<GatesList />} />
          <Route path="/gate/:gateId" element={<GateDetails />} />
          <Route 
            path="/checkpoint" 
            element={
              <ProtectedRoute requiredRole="employee">
                <Checkpoint />
              </ProtectedRoute>
            } 
          />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/employees" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminEmployees />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminReports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/control" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminControl />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
