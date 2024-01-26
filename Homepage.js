// Homepage.js
import React from 'react';

const Homepage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to School Management Application</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh', // Full viewport height
    backgroundImage: 'url("./cardbg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff', // Text color
    padding: '20px', // Added padding for better spacing on smaller screens
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '20px',
  },

  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    title: {
      fontSize: '2em', // Adjusted font size for smaller screens
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '1.5em', // Further adjusted font size for smaller screens
    },
  },
  '@media (max-width: 320px)': {
    title: {
      fontSize: '1.2em', // Adjusted font size for even smaller screens
    },
  },
};

export default Homepage;
