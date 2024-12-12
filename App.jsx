import "./App.css";
import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
import NutritionPage from "./NutritionPage";
import TimePage from "./TimePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/NutritionPage" element={<NutritionPage />} />
        <Route path="/TimePage" element={<TimePage />} />
      </Routes>
    </Router>
  );
}
