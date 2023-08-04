const Message = ({ message }) => {
  if (message) {
    if (message.includes('has already been removed from the server')) {
      return <div className="error">{message}</div>
    }
    return <div className="message">{message}</div>
  }
}

export default Message
