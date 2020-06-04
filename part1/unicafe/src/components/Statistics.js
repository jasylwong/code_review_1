import React from 'react';
import Statistic from './Statistic';

const Statistics = ({ scores }) => {
  const {good, neutral, bad, all} = scores
  let average = (1 * good + -1 * bad) / all || 0
  let positive = good / all || 0

  return (
    <div>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={average}/>
      <Statistic text="positive" value={positive} percent="%" />
    </div>
  )
}

export default Statistics;