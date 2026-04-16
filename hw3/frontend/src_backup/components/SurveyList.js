// Name: Gnanitha Suryadevara
// Course: SWE 645 - HW3
// Purpose: Component to display all submitted surveys with edit and delete options

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSurveys = async () => {
    try {
      const res = await axios.get(`${API_URL}/surveys`);
      setSurveys(res.data);
    } catch {
      setError('Failed to load surveys.');
    }
  };

  useEffect(() => { fetchSurveys(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this survey?')) return;
    try {
      await axios.delete(`${API_URL}/surveys/${id}`);
      fetchSurveys();
    } catch {
      setError('Failed to delete survey.');
    }
  };

  return (
    <div className="card">
      <h2>All Surveys ({surveys.length})</h2>
      {error && <div className="error-msg">{error}</div>}
      {surveys.length === 0 ? (
        <p>No surveys submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Date</th>
              <th>Recommendation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map(s => (
              <tr key={s.id}>
                <td>{s.firstName} {s.lastName}</td>
                <td>{s.email}</td>
                <td>{s.city}, {s.state}</td>
                <td>{s.dateOfSurvey}</td>
                <td>{s.recommendationLikelihood}</td>
                <td>
                  <div className="action-btns">
                    <button className="btn btn-primary" onClick={() => navigate(`/edit/${s.id}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SurveyList;
