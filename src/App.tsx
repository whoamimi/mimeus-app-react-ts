import "./styles.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

// Page imports
import Home from './pages/Home';
import Agent from './pages/Agent';
import Dashboard from './pages/Dashboard';
// import ActionSpace from './pages/ActionSpace';
// import User from './pages/User';
import Family from './pages/Family';
import Memory from './pages/Memory';

const stars = new Array(50).fill(0).map((_, i) => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  return (
    <div
      key={i}
      className="star"
      style={{
        top: `${top}vh`,
        left: `${left}vw`,
        animationDelay: `${delay}s`,
      }}
    />
  );
});

const App: React.FC = () => {
  return (
    <Router>
      {stars}
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/family" element={<Family />} />
          <Route path="/agent-analytics" element={<Dashboard />} />
          <Route path="/memory" element={<Memory />} />
          {/*<Route path="/agent-actions" element={<ActionSpace />} />*/}
          {/*<Route path="/user" element={<User />} />*/}
        </Routes>
      </main>
    </Router>
  );
};

export default App;