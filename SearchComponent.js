// SearchComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);


  const handleSearch = async () => {
    try {
      console.log('Search Query:', searchQuery);
      // Send a request to the server to search for the provided query
      const response = await axios.get(`${window.location.origin}/api/search/${searchQuery}`);
      console.log('Response:', response.data);  // Log the response data

      if (response.data) {
        setSearchResult(response.data);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Error searching for student:', error);
    }
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Enter search query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.searchButton}>
        Search
      </button>
      {searchResult && searchResult.length > 0 && (
        <div style={styles.searchBody}>
          <h3 style={styles.heading}>Search Results:</h3>
          <ul style={styles.resultsList}>
            {searchResult.map((result, index) => (
              <li key={index} style={styles.listItem}>
                <strong>Full Name:</strong> {result.fullName} |
                <strong> Father's Name:</strong> {result.fatherName} |
                <strong> Caste:</strong> {result.caste} |
                <strong> Class:</strong> {result.class} |
                <strong> GR:</strong> {result.grNo} |
                <strong> Roll:</strong> {result.rollNo} |
                <strong>id:</strong> {result._id} 
                {/* Add other fields as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};

const styles = {
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    border: '2px solid #3498db',
    borderRadius: '5px',
    width: '70%',
    fontSize: '16px',
  },
  searchButton: {
    padding: '12px',
    backgroundColor: '#0ff90f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  searchBody: {
    marginTop: '20px',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
  },
  resultsList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    marginTop: '10px',
    padding: '15px',
    backgroundColor: '#0ff90f',
    color: '#333',
    border: '1px solid #bdc3c7',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
};

//background-color:rgb(37 255 71)

export default SearchComponent;

