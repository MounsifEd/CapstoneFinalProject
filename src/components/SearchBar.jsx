/**
 * SearchBar Component
 * Input field for searching products by name or keyword
 * Props: onSearch (callback function when user searches)
 */

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Call parent callback function
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search for:', searchTerm);
    // Perform search logic here
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />

      {/* Search button */}
      <button type="submit" className="search-btn">
        🔍 Search
      </button>
    </form>
  );
}
