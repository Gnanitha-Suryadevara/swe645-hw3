// Name: Gnanitha Suryadevara
// Course: SWE 645 - HW3
// Purpose: Main App component with routing for the Student Survey application

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import SurveyList from './components/SurveyList';
import EditSurvey from './components/EditSurvey';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>SWE 645 - Student Survey</h1>
          <div className="nav-links">
            <Link to="/">Submit Survey</Link>
            <Link to="/surveys">View All Surveys</Link>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<SurveyForm />} />
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/edit/:id" element={<EditSurvey />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
