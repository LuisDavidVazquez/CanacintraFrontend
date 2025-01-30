import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Station from './pages/station/Station';
import StationDetail from './pages/station/StationDetail';
import Plant from './pages/plant/Plant';
import Stat from './pages/stat/Stat';
import Landing from './pages/landing/Landing';
import Setting from './pages/settings/Setting';
import Sensor from './pages/sensor/Sensor';
import ControlCultivos from './pages/controlcultivos/ControlCultivos';
import SellerProfile from './pages/sellerprofile/SellerProfile';
import User from './pages/user/User';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sellers/hibo" element={<SellerProfile />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/stations" element={<Station />} />
            <Route path="/stations/:id" element={<StationDetail />} />
            <Route path="/stations/:id/plants" element={<ControlCultivos/>} />
            <Route path="/stations/:id/sensors" element={<Sensor />} />
            <Route path="/plants" element={<Plant/>} />
            <Route path="/stats" element={<Stat />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/user" element={<User/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App