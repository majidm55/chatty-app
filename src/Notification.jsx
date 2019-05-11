import React, { Component } from 'react';

class Notification extends Component {
    render() {

        return (
            <div className="notification">
                <span className="message system">{this.props.message.oldUser} changed their name to {this.props.message.username}.</span>
            </div>
        )

    }
}
export default Notification;
