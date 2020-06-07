import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  console.log(notification.type)

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification