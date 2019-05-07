import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    };
  }
  render() {
    return (
      <div><nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <ChatBar currentUser ={this.state.currentUser.name} />
      <MessageList messages = {this.state.messages}/>
      </div>
    );
  }
}
export default App;

