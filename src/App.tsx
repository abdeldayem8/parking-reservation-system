import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import GateDetails from './pages/GateDetails'
import Admin from './pages/Admin'
import CheckPoint from './pages/checkPoint'
import GatesList from './pages/GatesList'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<GatesList />} />
      <Route path="/gate/:gateId" element={<GateDetails />} />
      <Route path="/checkpoint" element={<CheckPoint />} />
      <Route path="/admin" element={<Admin/>} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
