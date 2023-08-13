const Message = ({ message }) => {
  if (message.message) {
    if (message.error) {
      return <div className="error">{message.message}</div>
    }
    return <div className="message">{message.message}</div>
  }
}

export default Message
