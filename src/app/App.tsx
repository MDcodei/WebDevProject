import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page';
import MainPage from './main/page';
import SavedPage from './saved/page';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/saved" element={<SavedPage />} />        
      </Routes>
    </Router>
  );
};

export default App;
