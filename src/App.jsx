import React, { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import TopNav from "./components/TopNav";
// import Dashboard from "./pages/Dashboard";
// import Booking from "./pages/Booking";
// import Packages from "./pages/Packages";
import Login from './Authorization/Login';
import Register from './Authorization/Register'


export default function App() {
    const [showLogin, setShowLogin] = useState(true);
    
    if(showLogin){
        return <Login onSwitchToRegister={() => setShowLogin(false)} />;
    }
    if(!showLogin){
        return <Register onSwitchToLogin={() => setShowLogin(true)} />;
    }
    
    return(
    <Router>
      <TopNav />
      <main className="pt-4 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/bookings" element={<Booking />} />
          {}
        </Routes>
      </main>
    </Router>
  );
}
