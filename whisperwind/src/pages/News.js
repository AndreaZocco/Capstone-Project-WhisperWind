import React from 'react';
import '../News.css';

const News = () => {
  return (
    <div className="news-container">
      <h2>News</h2>
      <p>Latest updates from artists, podcasts, and shows you follow.</p>
      <div className="news-categories">
        <button className="news-category">ASMR content</button>
        <button className="news-category">Live Event</button>
      </div>
      <div className="news-content">
        <h3>No updates yet for you</h3>
        <p>When there are new updates, we’ll publish them here. Follow your favorite artists and podcasts to get all the updates about them.</p>
      </div>
    </div>
  );
};

export default News;
