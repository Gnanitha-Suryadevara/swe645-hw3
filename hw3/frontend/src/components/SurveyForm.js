// Name: Gnanitha Suryadevara
// Course: SWE 645 - HW3
// Purpose: Survey form component for submitting student survey data

import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const initialState = {
  firstName: '', lastName: '', streetAddress: '', city: '',
  state: '', zip: '', telephone: '', email: '', dateOfSurvey: '',
  likedMost: [], interestedVia: '', recommendationLikelihood: 'Very Likely',
  raffle: '', comments: ''
};

function SurveyForm() {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      likedMost: checked
        ? [...prev.likedMost, value]
        : prev.likedMost.filter(v => v !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    try {
      await axios.post(`${API_URL}/surveys`, {
        ...form,
        likedMost: form.likedMost.join(',')
      });
      setMessage('Survey submitted successfully!');
      setForm(initialState);
    } catch (err) {
      setError('Failed to submit survey. Please try again.');
    }
  };

  return (
    <div className="card">
      <h2>Student Survey Form</h2>
      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Street Address *</label>
          <input name="streetAddress" value={form.streetAddress} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <input name="city" value={form.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>State *</label>
            <input name="state" value={form.state} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Zip *</label>
            <input name="zip" value={form.zip} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Telephone *</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Survey *</label>
            <input type="date" name="dateOfSurvey" value={form.dateOfSurvey} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>What did you like most?</label>
          <div className="checkbox-group">
            {['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'].map(opt => (
              <label key={opt}>
                <input type="checkbox" value={opt}
                  checked={form.likedMost.includes(opt)}
                  onChange={handleCheckbox} />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>How did you hear about us?</label>
          <div className="radio-group">
            {['Friends', 'TV', 'Internet', 'Other'].map(opt => (
              <label key={opt}>
                <input type="radio" name="interestedVia" value={opt}
                  checked={form.interestedVia === opt}
                  onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Likelihood of Recommendation</label>
          <select name="recommendationLikelihood" value={form.recommendationLikelihood} onChange={handleChange}>
            <option>Very Likely</option>
            <option>Likely</option>
            <option>Unlikely</option>
          </select>
        </div>

        <div className="form-group">
          <label>Raffle (enter 10 comma-separated numbers, 1–100)</label>
          <input name="raffle" value={form.raffle} onChange={handleChange}
            placeholder="e.g. 5,12,23,34,45,56,67,78,89,99" />
        </div>

        <div className="form-group">
          <label>Additional Comments</label>
          <textarea name="comments" value={form.comments} onChange={handleChange} rows={3} />
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={() => setForm(initialState)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;
