import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Reviews from "./pages/Reviews";
import ReviewSummaryPage from "./pages/ReviewSummaryPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/summary" element={<ReviewSummaryPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
