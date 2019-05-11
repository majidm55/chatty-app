import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: "Anon", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      oldUser: "",
      users: 0 //// clients//
    };
  }
  ///ACTIONS WHEN CLIENT RECIEVES DATA
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('Browser client connected');
    };
    ////RECEIVING DATA FROM SERVER /////////
    this.socket.onmessage = (event) => {
      if (event.data == parseInt(event.data)) {
        return this.setState({ users: event.data });
      }

      let data = JSON.parse(event.data);
      let newMessageItem = {}
      let oldMessages;
      let newMessages;
      ////////SWITCH STATEMENTS FOR DIFFERENT TYPES OF DATA RECIEVED////
      switch (data.type) {

        case 'incomingMessage':
          newMessageItem.username = data.username;
          newMessageItem.content = data.content;
          newMessageItem.id = data.id;
          newMessageItem.type = "incomingMessage";
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          this.setState({ messages: newMessages });
          break;
        case 'incomingNotification':
          newMessageItem.username = data.newUser;
          newMessageItem.id = data.id;
          newMessageItem.oldUser = data.oldUser;
          newMessageItem.type = "incomingNotification";
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          console.log("TCL: App -> this.socket.onmessage -> newMessages", newMessages)

          this.setState({ messages: newMessages });
          break;

        default:
          throw new Error('Unknown event type ' + data.type);
      }


    }
  }

  ///SENDING MESSAGE/TEXT TO SERVER////
  changeText = (text) => {
    const newText = {
      username: this.state.currentUser,
      content: text,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(newText));

  }

  ///CHANGE USERNAME AND SEND TO SERVER//
  changeStateName = (info) => {
    const oldUser = this.state.currentUser;
    let msgNote = {
      type: "postNotification",
      oldUser: oldUser,
      newUser: info
    }
    this.socket.send(JSON.stringify(msgNote));

    this.setState({
      currentUser: info,
      oldUser: oldUser
    })


  }


  render() {
    console.log(this.state.messages);

    return (
      <div><nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users"> Users online :
         {this.state.users}
        </span>
      </nav>
        <ChatBar currentUser={this.state.currentUser} changeStateName={this.changeStateName} changeText={this.changeText} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;

