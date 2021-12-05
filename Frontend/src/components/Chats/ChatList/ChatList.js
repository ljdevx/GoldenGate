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
    data: [],
  };

  /*
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
*/

  componentDidMount() {
    console.log("asdf");
    setTimeout(() => {
      const address = "0x3aaa363e21424aB8Fb598f5763ba874bbb0B600b"; // window.ethereum.selectedAddress;
      const token = "0xf14098cae6b5717d37b563da93b28eaa8ea75460ac16452effa8ec128d2c41284f6fd7b2bc17e18911e20bd1e5685fff08144f76cead08fd45999676a8b827671b"; // localStorage.getItem('token'); //TODO
      fetch(`https://api.creatornfts.xyz/api/w3mail/conversations?address=${address}&chain=ETH&signature=${token}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            var params = window.location.href.split("/");
            this.setState({
              data: responseJson.data,
            });
          } else {
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500)

  }

  handleChatClick = (id) => {
    this.props.handleChatClick();
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

                </div>
                <ul
                  className="contacts-list"
                  id="chatContactTab"
                  data-chat-list=""
                >


                  {this.state.data.map((chat, index) => {
                    return (
                      <ChatMessage
                        key={"chat-" + index}
                        message={chat.participants[1].address}
                        handleChatClick={() => {
                          this.handleChatClick(chat.participants[1].address);
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
