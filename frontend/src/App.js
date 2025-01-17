import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import JobStats from './components/JobStats';
import Filters from './components/Filters';
import Login from './components/Login';

const App = () => {
  const [jobStats, setJobStats] = useState({});
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    timeRange: ''
  });

  useEffect(() => {
    fetchJobStats();
  }, [filters]);

  const fetchJobStats = async () => {
    try {
      const response = await axios.get('/api/job-stats', {
        params: filters
      });
      setJobStats(response.data);
    } catch (error) {
      console.error('Error fetching job statistics:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/">
            <Filters onFilterChange={handleFilterChange} />
            <JobStats jobStats={jobStats} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
