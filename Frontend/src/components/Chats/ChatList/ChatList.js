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

// Chat list component - To display list
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
      },
      {
        ChatUserId: "group1",
        to: "/Chats/group1",
        name: "Themeforest Group",
        profile: <UserGroupSvg />,
        profileType: ProfileType.Svg,
        time: "10:20 pm",
        message:
          "Jeny: That’s pretty common. I heard that a lot of people had the same experience.",
        endIcon: <LockSvg />,
        filter: ChatFilterOptions.Groups,
      },
      {
        to: "#",
        name: "Eva Walker",
        profile: "EW",
        profileType: ProfileType.Text,
        time: "09:36 am",
        message:
          "You’re kidding! I drive a motorcycle as well. What type of bike do you have?",
        badge: 2,
        status: UserStatus.Offline,
        filter: ChatFilterOptions.Unread,
      },
      {
        to: "#",
        name: "Christopher Garcia",
        time: "Yesterday",
        profile: avatar3,
        profileType: ProfileType.Image,
        status: UserStatus.Busy,
        MessageSvg: <PhotoSvg />,
        message: "Photo",
        filter: ChatFilterOptions.Friends,
      },
      {
        to: "#",
        name: "Christina Turner",
        time: "31/05/20",
        profile: avatar4,
        profileType: ProfileType.Image,
        status: UserStatus.Online,
        message:
          "I’m working hard in Maths, Physics and Chemistry. I have planning to appear in I.I.T. after XII.",
        filter: ChatFilterOptions.Friends,
      },
      {
        to: "#",
        name: "Tammy Martinez",
        time: "24/04/20",
        profile: avatar5,
        profileType: ProfileType.Image,
        status: UserStatus.Offline,
        MessageSvg: <DocsSvg />,
        message: "project_guidelines.docs",
        filter: ChatFilterOptions.Friends,
      },
      {
        to: "#",
        name: "Bonnie Torres",
        time: "20/04/20",
        profile: avatar6,
        profileType: ProfileType.Image,
        status: UserStatus.Offline,
        message: "Catch you later! Bye-bye!",
        endIcon: <MuteSvg />,
        filter: ChatFilterOptions.Friends,
      },
      {
        to: "#",
        name: "Jacqueline James",
        time: "15/02/20",
        profile: avatar7,
        profileType: ProfileType.Image,
        status: UserStatus.Offline,
        MessageSvg: <MissedCallSvg />,
        message: "Missed call",
        filter: ChatFilterOptions.Friends,
      },
      {
        to: "#",
        name: "Annie Richardson",
        time: "26/12/19",
        profile: avatar8,
        profileType: ProfileType.Image,
        status: UserStatus.Away,
        message: "I think I have everything I need, thank you!",
        filter: ChatFilterOptions.Archived,
      },
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
