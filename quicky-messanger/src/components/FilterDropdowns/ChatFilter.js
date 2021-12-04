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
      <DropdownButton
        className="border-0 f-16 p-0 min-w-150 cut-texts"
        variant="outline-default"
        onSelect={handleChange}
        title={selectedTitle}
      >
        <Dropdown.Item
          eventKey={ChatFilterOptions.AllChats}
          active={props.selectedOption === ChatFilterOptions.AllChats}
        >
          All Chats
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={ChatFilterOptions.Friends}
          active={props.selectedOption === ChatFilterOptions.Friends}
        >
          Friends
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={ChatFilterOptions.Groups}
          active={props.selectedOption === ChatFilterOptions.Groups}
        >
          Groups
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={ChatFilterOptions.Unread}
          active={props.selectedOption === ChatFilterOptions.Unread}
        >
          Unread
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={ChatFilterOptions.Archived}
          active={props.selectedOption === ChatFilterOptions.Archived}
        >
          Archived
        </Dropdown.Item>
      </DropdownButton>

      <form className="form-inline">
        <div className="input-group">
          <input
            type="text"
            className="form-control search border-right-0 transparent-bg pr-0"
            placeholder="Search users..."
            value={props.search}
            onChange={props.handleSearch}
          ></input>
          <div className="input-group-append">
            <div
              className="input-group-text transparent-bg border-left-0"
              role="button"
            >
              <SearchSvg className="text-muted hw-20" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ChatFilter;
