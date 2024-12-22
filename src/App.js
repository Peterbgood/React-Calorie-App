import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import FoodLog from './FoodLog';

const Week = () => {
  window.location.href = 'https://example.com/week'; // Replace with actual URL
  return <div>Loading...</div>;
};

const Yearly = () => {
  window.location.href = 'https://example.com/yearly'; // Replace with actual URL
  return <div>Loading...</div>;
};

const Weight = () => {
  window.location.href = 'https://example.com/weight'; // Replace with actual URL
  return <div>Loading...</div>;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/React-Calorie-App" element={<FoodLog />} />
        <Route path="/" element={<FoodLog />} />
        <Route path="/week" element={<Week />} />
        <Route path="/yearly" element={<Yearly />} />
        <Route path="/weight" element={<Weight />} />
      </Routes>
    </Router>
  );
}

export default App;