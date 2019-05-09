import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx';



class MessageList extends Component {
    render() {
      let msgContent = this.props.messages.map((message) =>
      <Message  key = {message.id} username ={message.username} content = {message.content}/> 
      );
      
      
      return (

        <main className="messages">
        <Notification oldUser ={this.props.oldUser} currentUser = {this.props.currentUser}/>

        {msgContent}
        </main>

      );
    }
  }
export default MessageList;


