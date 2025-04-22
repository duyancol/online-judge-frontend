import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from './page/Header';
import './page/Header.css'
import StudyPlanSection from './page/StudyPlanSection'
import './page/StudyPlanSection.css'
import MainDashboard from './page/MainDashboard'
import ProblemDetail from './page/ProblemDetail';
import GoogleLoginSection from './page/GoogleLoginSection';
function App() {
  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problems/:id" element={<ProblemDetail />} />
      <Route path="/login" element={<GoogleLoginSection />} />
    </Routes>
  </Router>
  );
}

export default App;
