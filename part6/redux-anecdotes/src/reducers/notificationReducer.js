const notification = 'This is a notification'

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return action.data
    default:
       return state
  }
}

export default notificationReducer