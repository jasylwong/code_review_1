import React from 'react';

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => (a + b.exercises), 0)

  return (
    <p><strong>Total of {total} exercises</strong></p>
  )
}

export default Total;