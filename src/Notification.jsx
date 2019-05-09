import React, { Component } from 'react';

class Notification extends Component {
    render() {
        if (this.props.oldUser === "" ) {
            return null; 
        } 
        else {
            return(
    <div className="notification">
        <span className="notification-content">{this.props.oldUser} changed their name to {this.props.currentUser}.</span>
    </div>
        )
        }  
}
}
export default Notification;
