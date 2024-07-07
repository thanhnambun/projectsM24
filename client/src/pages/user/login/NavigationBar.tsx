import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {/* Add other links */}
    </nav>
  );
}

export default NavigationBar;