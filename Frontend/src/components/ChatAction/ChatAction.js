import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateGroup from "../Modals/CreateGroup/CreateGroup";
import InviteOthers from "../Modals/InviteOthers/InviteOthers";
import Notifications from "../Modals/Notifications/Notifications";
import StartConversation from "../Modals/StartConversation/StartConversation";

import { ReactComponent as NotificationsSvg } from "../../assets/media/icons/notifications.svg";
import { ReactComponent as VerticalOptionDots } from "../../assets/media/icons/verticaloptiondots.svg";
import { Dropdown } from "react-bootstrap";

// Top  Re-usable Action Component
class ChatAction extends Component {
  state = {
    showNotification: false,
    showNewChat: false,
    showNewGroup: false,
    showInviteOthers: false,
  };

  toggleNotification = () => {
    this.setState({
      showNotification: !this.state.showNotification,
    });
  };

  toggleNewChat = () => {
    this.setState({
      showNewChat: !this.state.showNewChat,
    });
  };

  toggleCreateGroup = () => {
    this.setState({
      showNewGroup: !this.state.showNewGroup,
    });
  };

  toggleInviteOthers = () => {
    this.setState({
      showInviteOthers: !this.state.showInviteOthers,
    });
  };

  render() {
    return (
      <>
        <ul className="nav flex-nowrap">
          <li className="nav-item list-inline-item mr-0">
          <button
                  className="btn btn-primary no-box-shadow"
                  type="button"
                  data-toggle="modal"
                  data-target="#startConversation"
                  onClick={this.toggleNewChat}
                > Start Chat
                  </button>
          </li>
        </ul>
        {/* Render modal based on button click */}
        {this.state.showNotification ? (
          <Notifications hideNotification={this.toggleNotification} />
        ) : null}
        {this.state.showNewChat ? (
          <StartConversation hideNewChat={this.toggleNewChat} />
        ) : null}
        {this.state.showNewGroup ? (
          <CreateGroup hideNewGroup={this.toggleCreateGroup} />
        ) : null}
        {this.state.showInviteOthers ? (
          <InviteOthers hideInviteOthers={this.toggleInviteOthers} />
        ) : null}
      </>
    );
  }
}
export default ChatAction;
