import React from 'react';
import './ProgressBar.css'; // Import the SASS file for styles

const ProgressBar = ({ data }) => {
  return (
    <div className="progress-container">
        <h2>مقارنه بين الهدف و الهدف المحقق من الخرجات</h2>
      {data.map((item, index) => {
        const percentage = (item.achieved_targets / item.target * 100).toFixed(2);
        // const percentage = 60;
        return (
            <div className="progress">
          <div key={index} className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${percentage}%` }}>{percentage} % </div>
            <span className="progress-bar-label">{`${item.achieved_targets} / ${item.target}`}</span>
          </div>
          <div>{item.title}</div>
            </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
