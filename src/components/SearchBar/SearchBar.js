// src/SearchBar.js

import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch, onInputChange, currentQuery }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (currentQuery.trim() !== '') {
        onSearch(currentQuery);
      }
    };

    const handleInputChange = (e) => {
      onInputChange(e.target.value);
    };
  
    return (
      <div className="search-bar-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" /> 
          <input
            type="text"
            value={currentQuery}
            onChange={handleInputChange}
            placeholder="Search for recipes..."
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button" disabled={currentQuery.trim() === ''}>
            Search
          </button>
        </form>
      </div>
    );
};

export default SearchBar;