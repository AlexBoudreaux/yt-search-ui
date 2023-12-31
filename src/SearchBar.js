import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(query);
    };
  
    return (
      <div className="search-bar-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" /> 
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes..."
            className="search-input"
            autoFocus  // Automatically focus this input when the component mounts
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    );
  };

export default SearchBar;