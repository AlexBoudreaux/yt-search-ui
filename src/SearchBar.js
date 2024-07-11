// src/SearchBar.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch, onInputChange }) => {
    const [query, setQuery] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(query);
    };

    const handleInputChange = (e) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      onInputChange(newQuery);
    };
  
    return (
      <div className="search-bar-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" /> 
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for recipes..."
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    );
};

export default SearchBar;