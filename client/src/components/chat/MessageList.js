import React, { Component } from 'react';

class MessageList extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div>
        <ul className="message-ul">
          {this.props.messages.map((message, index) => (
            <li key={index}>
              <div>
                <span>{message.senderId}</span>
                <p>{message.parts[0].payload.content}</p>
              </div>
            </li>
          ))}
          <div
            ref={el => {
              this.el = el;
            }}
          />
        </ul>
      </div>
    );
  }
}

export default MessageList;
