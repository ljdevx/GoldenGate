import React, { Component } from "react";

import avatar2 from "../../../assets/media/avatar/2.png";
import avatar3 from "../../../assets/media/avatar/3.png";
import avatar4 from "../../../assets/media/avatar/4.png";
import avatar5 from "../../../assets/media/avatar/5.png";
import avatar6 from "../../../assets/media/avatar/6.png";
import avatar7 from "../../../assets/media/avatar/7.png";
import avatar8 from "../../../assets/media/avatar/8.png";

import ChatAction from "../../ChatAction/ChatAction";
import ChatFilter from "../../FilterDropdowns/ChatFilter";

import { ReactComponent as UserGroupSvg } from "../../../assets/media/heroicons/outline/user-group.svg";
import { ReactComponent as LockSvg } from "../../../assets/media/icons/lock.svg";
import { ReactComponent as PhotoSvg } from "../../../assets/media/icons/photo.svg";
import { ReactComponent as DocsSvg } from "../../../assets/media/icons/docs.svg";
import { ReactComponent as MuteSvg } from "../../../assets/media/icons/mute.svg";
import { ReactComponent as MissedCallSvg } from "../../../assets/media/icons/missedcall.svg";
import {
  ChatFilterOptions,
  ProfileType,
  UserStatus,
} from "../../../Config/Config";
import ChatMessage from "./Message/ChatMessage";

// Chat list component - To display list // TODO- update with dynamic API call 
class ChatList extends Component {
  state = {
    ChatUserId: "",
    search: "",
    filterOption: ChatFilterOptions.AllChats,
    AllChatList: [
      {
        ChatUserId: "user1",
        to: "/Chats/user1",
        name: "Catherine Richardson",
        profile: avatar2,
        profileType: ProfileType.Image,
        time: "Just now",
        message: "I’m sorry, I didn’t catch that. Could you please repeat?",
        status: UserStatus.Online,
        filter: ChatFilterOptions.Friends,
      }
      
    ],
    FilterChatList: [],
  };

  // Get userid from parameter to load perticular user chat history
  componentDidMount() {
    var params = window.location.href.split("/");
    this.setState({
      ChatUserId: params[params.length - 1],
      FilterChatList: this.state.AllChatList.map((chat) => {
        chat.active = chat.ChatUserId === params[params.length - 1];
        return chat;
      }),
    });
  }

  handleChatClick = (id) => {
    this.props.handleChatClick();
  };

  handleFilterOptionChanged = (option) => {
    let chatList = [...this.state.AllChatList];
    if (option !== ChatFilterOptions.AllChats)
      chatList = chatList.filter((x) => x.filter === option);

    this.setState({
      filterOption: option,
      FilterChatList: chatList,
      search: "",
    });
  };

  handleSearchChat = (event) => {
    let chatList = [...this.state.AllChatList];
    if (this.state.filterOption !== ChatFilterOptions.AllChats)
      chatList = chatList.filter((x) => x.filter === this.state.filterOption);

    if (event.target.value) {
      chatList = chatList.filter(
        (x) =>
          x.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0
      );
    }
    this.setState({
      search: event.target.value,
      FilterChatList: chatList,
    });
  };

  render() {
    return (
      <aside className="sidebar">
        <div className="tab-content">
          <div className="tab-pane active" id="chats-content">
            <div className="d-flex flex-column h-100">
              <div className="hide-scrollbar h-100" id="chatContactsList">
                <div className="sidebar-header sticky-top p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-semibold mb-0">Chats</h5>
                    <ChatAction />
                  </div>
                  <ChatFilter
                    selectedOption={this.state.filterOption}
                    filterOptionChanged={this.handleFilterOptionChanged}
                    search={this.state.search}
                    handleSearch={this.handleSearchChat}
                  />
                </div>
                <ul
                  className="contacts-list"
                  id="chatContactTab"
                  data-chat-list=""
                >
                  {this.state.FilterChatList.map((chat, index) => {
                    return (
                      <ChatMessage
                        key={"chat" + index}
                        {...chat}
                        handleChatClick={() => {
                          this.handleChatClick(chat.ChatUserId);
                        }}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}
export default ChatList;
