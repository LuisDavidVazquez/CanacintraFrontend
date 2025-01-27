import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App