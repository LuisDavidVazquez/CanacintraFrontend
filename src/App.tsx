import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Station from './pages/station/Station';
import Plant from './pages/plant/Plant';
import Stat from './pages/Stat/Stat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stations" element={<Station />} />
        <Route path="/plants" element={<Plant/>} />
        <Route path="/stats" element={<Stat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App