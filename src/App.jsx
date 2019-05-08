import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  
    this.socket = new WebSocket('ws://localhost:3001');

  }
  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Browser client connected');
    };

    this.socket.onmessage = (event) => {
      let newstate = this.state.messages;
      newstate.push(JSON.parse(event.data))
      console.log(event.data);
      this.setState({ messages: newstate })
    }
  }


  changeText = (text) => {
    const newText = {
      username: this.state.currentUser.name,
      content: text,
      id: this.state.messages.length + 1
    };
    this.socket.send(JSON.stringify(newText));

  }


  changeStateName = (info) => {
    this.setState({ currentUser: { name: info } })
  }


  render() {
    return (
      <div><nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <ChatBar currentUser={this.state.currentUser.name} changeStateName={this.changeStateName} changeText={this.changeText} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;

