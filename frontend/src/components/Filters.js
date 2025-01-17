import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [timeRange, setTimeRange] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange({ category: e.target.value, location, timeRange });
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    onFilterChange({ category, location: e.target.value, timeRange });
  };

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
    onFilterChange({ category, location, timeRange: e.target.value });
  };

  return (
    <div className="filters">
      <div className="filter">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="filter">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <div className="filter">
        <label htmlFor="timeRange">Time Range:</label>
        <input
          type="text"
          id="timeRange"
          value={timeRange}
          onChange={handleTimeRangeChange}
        />
      </div>
    </div>
  );
};

export default Filters;
