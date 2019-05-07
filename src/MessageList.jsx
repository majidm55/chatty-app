import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
    render() {
      let msgContent = this.props.messages.map((message) =>
      <Message  key = {message.username} username ={message.username} content = {message.content}/> 
      );
      return (
        <main className="messages">
        {msgContent}
        </main>
      );
    }
  }
export default MessageList;


