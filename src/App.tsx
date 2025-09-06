import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Navbar from './components/Common/Navbar'
import GateDetails from './pages/GateDetails'
import Admin from './pages/Admin'
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
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
