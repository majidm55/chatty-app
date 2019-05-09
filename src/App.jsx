import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser:"Anon" , // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      oldUser:"",
      users: 0 //// clientss//
    };
  

  }
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onopen = () => {
      console.log('Browser client connected');
    };
////receieving data from server
    this.socket.onmessage = (event) => {
      if (event.data == parseInt(event.data)) {
        return this.setState({ users: event.data });
      }

      let data= JSON.parse(event.data);
      let newMessageItem ={}
      let oldMessages;
      let newMessages;
      switch(data.type) {

        case 'incomingMessage' :
          newMessageItem.username = data.username;
          newMessageItem.content = data.content;
          newMessageItem.id = data.id;
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          this.setState({messages: newMessages});   
          break;
        case 'incomingNotification' :
          newMessageItem.content = data.content;
          newMessageItem.id = data.id;
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          this.setState({messages: newMessages});    
          break;
       
        default:
          throw new Error('Unknown event type ' + data.type);
      }

    
    }
  }

///sening data to server
  changeText = (text) => {
    const newText = {
      username: this.state.currentUser,
      content: text,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(newText));

  }

///change user name,sende data to server//
  changeStateName = (info) => {
    const oldUser = this.state.currentUser;
    let msgNote = {
      type: "postNotification",
      oldUser: oldUser,
      newUser: info
    }
    this.setState({ currentUser: info ,
                    oldUser: oldUser})

    this.socket.send(JSON.stringify(msgNote));

  }


  render() {
    return (
      <div><nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users">
        {this.state.users} users online
        </span>
      </nav>
        <ChatBar currentUser={this.state.currentUser} changeStateName={this.changeStateName} changeText={this.changeText} />
        <MessageList messages={this.state.messages} oldUser ={this.state.oldUser} currentUser = {this.state.currentUser} />
      </div>
    );
  }
}
export default App;

