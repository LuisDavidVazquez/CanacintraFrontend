import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Station from './pages/station/Station';
import StationDetail from './pages/station/StationDetail';
import Plant from './pages/plant/Plant';
import Landing from './pages/landing/Landing';
import Stat from './pages/stat/Stat';
import Setting from './pages/settings/Setting';
import Sensor from './pages/sensor/Sensor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/stations" element={<Station />} />
          <Route path="/stations/:id" element={<StationDetail />} />
          <Route path="/stations/:id/plants" element={<Plant/>} />
          <Route path="/stations/:id/sensors" element={<Sensor />} />
          <Route path="/stats" element={<Stat />} />
          <Route path="/settings" element={<Setting />} />


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App