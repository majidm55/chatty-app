import React, {Component} from 'react';

class ChatBar extends Component {
    render() {

///ADDING MESSAGE FROM CHAT BAR ///////
      const addText = evt => {
        if(evt.key === 'Enter'){
        let newText = evt.target.value
        console.log(newText);     

        this.props.changeText(newText); 
      }
    }
/////CHANGING USERNAME FROM CHAT BAR////////
      const changeUserInfo = evt => {
        if(evt.key === 'Enter'){
        let newValue = evt.target.value;
        this.props.changeStateName(newValue);
        console.log(newValue);
      };
    }
      return (
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue ={this.props.currentUser} onKeyPress ={changeUserInfo} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress = {addText} />
      </footer>
      );
    }
  }

export default ChatBar;

