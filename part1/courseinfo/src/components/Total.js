import React from 'react';

const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts[0] + parts[1] + parts[2]}</p>
  )
}

export default Total;