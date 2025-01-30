import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Station from './pages/station/Station';
import Plant from './pages/plant/Plant';
import Landing from './pages/landing/Landing';
import Setting from './pages/settings/Setting';
import ControlCultivos from './pages/controlcultivos/ControlCultivos';
import SellerProfile from './pages/sellerprofile/SellerProfile';
import User from './pages/user/User';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sellers/hibo" element={<SellerProfile />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/stations" element={<Station />} />
          <Route path="/plants" element={<Plant />} />
          <Route path="/stats" element={<Stat />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/user/juan" element={<User/>}></Route>
          <Route path="/stations/1" element={<ControlCultivos />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App