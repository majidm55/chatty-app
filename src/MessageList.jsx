import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx';


//working code
// class MessageList extends Component {
//     render() {
//       let msgContent = this.props.messages.map((message) =>
//       <Message  key = {message.id} username ={message.username} content = {message.content}/> 
//       );
      
      
//       return (

//         <main className="messages">
        
//         <Notification oldUser ={this.props.oldUser} currentUser = {this.props.currentUser}/>

//         {msgContent}
//         </main>

//       );
//     }
//   }


  // second working code partially
  // class MessageList extends Component {
  //   render() {
  //     return (
  //       <main className="messages">
  //       { this.props.messages.map( message => {
  //         if (message.type === 'incomingMessage') {
  //           return <Message key={message.id} message={message.content} />
  //           } else {
  //             return <Notification key={message.id} content={message.content}/>
  //         }
  
  
  //       })
  //     }
  
  //       </main>
  //     );
  //   }
  // }
  class MessageList extends Component {
    // console.log("this.props messages",this.props.messages);
    render() {
      return (
        <main className="messages">
        { this.props.messages.map( message => {
					console.log("TCL: MessageList -> render -> message", message)
          if (message.type === 'incomingMessage') {
            return <Message key={message.id} message={message} />
            } else {
              return <Notification key={message.id} message={message}/>
          }
  
  
        })
      }
  
        </main>
      );
    }
  }

export default MessageList;


