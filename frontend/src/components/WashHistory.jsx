import React from 'react';

function WashHistory({ washHistory }) {
  return (
    <ul>
      {washHistory.map((wash) => (
        <li key={wash._id.$oid}>
          Date: {new Date(wash.date.$date.$numberLong).toLocaleString()} | Status: {wash.status}
        </li>
      ))}
    </ul>
  );
}

export default WashHistory;
