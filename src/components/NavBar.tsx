import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles.css";

const NavBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      {/*<div className="nav-logo">Mimeus AI</div>*/}

      <ul className="nav-links">
        <li className={isActive('/') ? 'active' : ''}><Link to="/">Home</Link></li>
        <li className={isActive('/agent') ? 'active' : ''}><Link to="/agent">Agent</Link></li>
        <li className={isActive('/agent-analytics') ? 'active' : ''}><Link to="/agent-analytics">Dashboard</Link></li>
        {/*<li className={isActive('/agent-actions') ? 'active' : ''}><Link to="/agent-actions">Action</Link></li>*/}
        {/*<li className={isActive('/user') ? 'active' : ''}><Link to="/user">User</Link></li>*/}
        <li className={isActive('/memory') ? 'active' : ''}><Link to="/memory">Memory</Link></li>
        <li className={isActive('/family') ? 'active' : ''}><Link to="/family">Family</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;