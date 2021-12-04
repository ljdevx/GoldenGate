import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ChatFilterOptions } from "../../Config/Config.js";

import { ReactComponent as SearchSvg } from "../../assets/media/icons/search.svg";

// Top chat filter
const ChatFilter = (props) => {
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    switch (props.selectedOption) {
      case ChatFilterOptions.AllChats:
        setSelectedTitle("All Chats");
        break;
      case ChatFilterOptions.Friends:
        setSelectedTitle("Friends");
        break;
      case ChatFilterOptions.Groups:
        setSelectedTitle("Groups");
        break;
      case ChatFilterOptions.Unread:
        setSelectedTitle("Unread");
        break;
      case ChatFilterOptions.Archived:
        setSelectedTitle("Archived");
        break;
      default:
        break;
    }
    return () => {};
  }, [props.selectedOption]);

  const handleChange = async (eventKey) => {
    // console.log(eventKey);
    await props.filterOptionChanged(parseInt(eventKey));
  };

  return (
    <div className="sidebar-sub-header">
      <form className="form-inline">
        <div className="input-group">

        </div>
      </form>
    </div>
  );
};
export default ChatFilter;
