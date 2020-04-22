import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from './blogs/BlogList';

const Dashboard = () => {
  return (
    <div>
      <BlogList />
      <div style={{ display: "flex", justifyContent: 'flex-end', marginTop: 100, marginBottom: 50 }}>
        <Link to="/blogs/new">
          <button type="button" class="btn btn-success btn-lg">Make a New Post</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
