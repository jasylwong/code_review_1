import React from 'react';

const Statistic = ({ text, value, percent }) => {
  return (
    <div>{text} {value}{percent}</div>
  )
}

export default Statistic;