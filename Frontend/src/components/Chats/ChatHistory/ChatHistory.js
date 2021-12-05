import React from "react";
import { Route } from "react-router-dom";
import EmptyChat from "./EmptyChat";
import UserChat from "./UserChat";
import GroupChat from "./GroupChat";

// Chat History with different Routing
function ChatHistory(props) {
  return (
    <>
      {/* <Route path="/Chats" component={EmptyChat} exact />
      <Route path="/Chats/user1" component={UserChat} exact />
      <Route path="/Chats/group1" component={GroupChat} exact /> */}
      <UserChat

        chatID={props.activeConversationID}
      // userAddress={this.state.address}
      />
    </>
  );
}
export default ChatHistory;
