import React from 'react';

const Button = ({ onClick, content }) => {
  return (
    <button onClick={onClick}>{content}</button>
  )
}

export default Button;