import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import EventDetails from './EventDetails';
import PerformerPage from './pages/PerformerPage'; // ✅ New import

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/performers/:slug" element={<PerformerPage />} /> {/* ✅ New route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;