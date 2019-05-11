import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';


class MessageList extends Component {
  render() {
    return (
      <main className="messages">

        {this.props.messages.map(message => {       ////MAPPING THROUGH EACH MESSAGE TO RENDER NOTIFICATION OR MESSAGE/////
          if (message.type === 'incomingMessage') {
            return <Message key={message.id} message={message} />
          } else {
            return <Notification key={message.id} message={message} />
          }

        })
        }

      </main>

    );
  }
}

export default MessageList;


