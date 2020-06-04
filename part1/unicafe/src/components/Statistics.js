import React from 'react';

const Statistics = ({ scores }) => {
  const {good, neutral, bad} = scores
  let all = good + neutral + bad
  let average = (1 * good + -1 * bad) / all || 0
  let positive = good / all || 0

  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  )
}

export default Statistics;