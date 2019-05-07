import React, {Component} from 'react';

class ChatBar extends Component {
    render() {

      const addText = evt => {
        if(evt.key === 'Enter'){
        let newText = evt.target.value
        this.props.changeText(newText);      
      }
    }

      const changeUserInfo = evt => {
        let newValue = evt.target.value;
        this.props.changeStateName(newValue);
        console.log(newValue);
      };
      return (
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value ={this.props.currentUser} onChange ={changeUserInfo} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress = {addText} />
      </footer>
      );
    }
  }

export default ChatBar;

