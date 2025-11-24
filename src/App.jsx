import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Packages from "./pages/Dashboard"; // Dashboard currently shows packages layout

export default function App() {
  return (
    <Router>
      <TopNav />
      <main className="pt-4 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages" element={<Dashboard />} />
          <Route path="/bookings" element={<Booking />} />
          {/* add more routes here */}
        </Routes>
      </main>
    </Router>
  );
}
