import React, { Component } from "react";
import { ThemeColor } from "../../Config/Config";
import NavBar from "../NavBar/NavBar";

import FriendList from "./FriendList/FriendList";
import FriendProfile from "./FriendProfile/FriendProfile";

// Friends master component
class Friends extends Component {
  state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    mainVisible: false,
    isRTL: Boolean(localStorage.getItem("rtl")),
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

  handleMainVisible = () => {
    this.setState({ mainVisible: true });
  };

  handleHideMain = () => {
    this.setState({ mainVisible: false });
  };
  render() {
    return (
      <div className="chats-tab-open h-100">
        <div className={"main-layout h-100"}>
          <NavBar activeMenu="friends" />

          <FriendList setMainVisible={this.handleMainVisible} startChatVisible={true} />

          <FriendProfile
            showMain={this.state.mainVisible}
            hideMain={this.handleHideMain}
          />

          <div className="backdrop"></div>
        </div>
      </div>
    );
  }
}
export default Friends;
