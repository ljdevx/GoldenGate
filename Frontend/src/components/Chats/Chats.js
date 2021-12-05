import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";

import ChatList from "./ChatList/ChatList";
import ChatHistory from "./ChatHistory/ChatHistory";
import UserChat from "./ChatHistory/UserChat";
import { ThemeColor } from "../../Config/Config";

// Chat master component
class Chats extends Component {
  state = {
    mainVisible: false,
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    isRTL: Boolean(localStorage.getItem("rtl")),
    activeConversationID: null
  };

  // Load selected theme
  componentDidMount() {
    let classList = document.body.classList;
    if (classList.length === 0 && this.state.themeColor === ThemeColor.Dark) {
      document.body.classList.add("dark-skin");
    } else if (classList.length && this.state.themeColor === ThemeColor.Light) {
      document.body.classList.remove("dark-skin");
    }
    if (this.state.isRTL) document.body.setAttribute("dir", "rtl");
    else document.body.removeAttribute("dir");
  }

  handleChatClick = (id) => {
    this.setState({ mainVisible: true, activeConversationID: id });
    debugger;
  };

  handleBackToList = () => {
    this.setState({ mainVisible: false });
  };

  //   async signMessage() {
  //     try {
  //       var message = "Generate my session signing key";
  //       await window.ethereum.send("eth_requestAccounts");
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const signature = await signer.signMessage(message);
  //       console.log(signature);
  //     } catch(err) {
  //         console.log(err)
  //     }
  // }

  render() {
    // console.log(this.state.activeConversationID)
    return (
      <div className="chats-tab-open h-100">
        <div className={"main-layout h-100"}>
          <NavBar activeMenu="chat" />

          <ChatList handleChatClick={this.handleChatClick} />

        {this.state.activeConversationID ? 
        <UserChat chatID={this.state.activeConversationID} /> :
        <UserChat chatID="" /> }

          {/* <ChatHistory
            activeConversationID={this.state.activeConversationID}
            mainVisible={this.state.mainVisible}
            BackToListClicked={this.handleBackToList}
          /> */}
          <div className="backdrop"></div>
        </div>
      </div>
    );
  }
}
export default Chats;
