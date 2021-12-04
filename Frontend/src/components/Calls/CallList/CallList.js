import React, { Component } from "react";

import avatar2 from "../../../assets/media/avatar/2.png";
import avatar3 from "../../../assets/media/avatar/3.png";
import avatar4 from "../../../assets/media/avatar/4.png";
import avatar5 from "../../../assets/media/avatar/5.png";
import avatar6 from "../../../assets/media/avatar/6.png";
import avatar7 from "../../../assets/media/avatar/7.png";

import ChatAction from "../../ChatAction/ChatAction";
import CallFilter from "../../FilterDropdowns/CallFilter";

import { ReactComponent as MissedCallSvg } from "../../../assets/media/icons/missedcall.svg";
import { ReactComponent as PhoneOutgoingSvg } from "../../../assets/media/heroicons/solid/phone-outgoing.svg";
import { ReactComponent as PhoneIncomingSvg } from "../../../assets/media/heroicons/solid/phone-incoming.svg";
import { CallFilterOptions, ProfileType } from "../../../Config/Config";

import Call from "./Call";

// Call list Component
class CallList extends Component {
  state = {
    filterOption: CallFilterOptions.AllCalls,
    search: "",
    AllCallList: [
      {
        to: "#",
        name: "Catherine Richardson",
        profile: avatar2,
        profileType: ProfileType.Image,
        time: "Just now",
        filter: CallFilterOptions.Incoming,
        CallTypeIcon: <PhoneIncomingSvg className="hw-16 text-muted mr-1" />,
        active: true,
      },
      {
        to: "#",
        name: "Eva Walker",
        profile: "EW",
        profileType: ProfileType.Text,
        time: "5 mins ago",
        filter: CallFilterOptions.Outgoing,
        CallTypeIcon: <PhoneOutgoingSvg className="hw-16 text-muted mr-1" />,
      },
      {
        to: "#",
        name: "Christopher Garcia",
        profile: avatar3,
        profileType: ProfileType.Image,
        time: "20 mins ago",
        filter: CallFilterOptions.Missedcalls,
        CallTypeIcon: <MissedCallSvg className="hw-16 text-danger mr-1" />,
      },
      {
        to: "#",
        name: "Christina Turner",
        profile: avatar4,
        profileType: ProfileType.Image,
        time: "4 hour ago",
        filter: CallFilterOptions.Outgoing,
        CallTypeIcon: <PhoneOutgoingSvg className="hw-16 text-muted mr-1" />,
      },
      {
        to: "#",
        name: "Tammy Martinez",
        profile: avatar5,
        profileType: ProfileType.Image,
        time: "Yesterday",
        filter: CallFilterOptions.Incoming,
        CallTypeIcon: <PhoneIncomingSvg className="hw-16 text-muted mr-1" />,
      },
      {
        to: "#",
        name: "Bonnie Torres",
        profile: avatar6,
        profileType: ProfileType.Image,
        time: "01/04/2021",
        filter: CallFilterOptions.Incoming,
        CallTypeIcon: <PhoneIncomingSvg className="hw-16 text-muted mr-1" />,
      },
      {
        to: "#",
        name: "Jacqueline James",
        profile: avatar7,
        profileType: ProfileType.Image,
        time: "23/03/2021",
        filter: CallFilterOptions.Outgoing,
        CallTypeIcon: <PhoneOutgoingSvg className="hw-16 text-muted mr-1" />,
      },
    ],
    FilterCallList: [],
  };

  componentDidMount() {
    this.setState({
      FilterCallList: [...this.state.AllCallList],
    });
  }

  setVisible = () => {
    this.props.setMainVisible();
  };

  handleFilterOptionChanged = (option) => {
    let callList = [...this.state.AllCallList];
    if (option !== CallFilterOptions.AllCalls)
      callList = callList.filter((x) => x.filter === option);

    this.setState({
      filterOption: option,
      FilterCallList: callList,
      search: "",
    });
  };

  handleSearchCall = (event) => {
    let callList = [...this.state.AllCallList];
    if (this.state.filterOption !== CallFilterOptions.AllCalls)
      callList = callList.filter((x) => x.filter === this.state.filterOption);

    if (event.target.value) {
      callList = callList.filter(
        (x) =>
          x.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0
      );
    }
    this.setState({
      search: event.target.value,
      FilterCallList: callList,
    });
  };

  render() {
    return (
      <aside className="sidebar">
        <div className="tab-content">
          <div className="tab-pane active" id="calls-content">
            <div className="d-flex flex-column h-100">
              <div className="hide-scrollbar h-100" id="callContactsList">
                <div className="sidebar-header sticky-top p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-semibold mb-0">Calls</h5>
                    <ChatAction />
                  </div>
                  <CallFilter
                    selectedOption={this.state.filterOption}
                    filterOptionChanged={this.handleFilterOptionChanged}
                    search={this.state.search}
                    handleSearch={this.handleSearchCall}
                  />
                </div>

                <ul className="contacts-list" id="callLogTab" data-call-list="">
                  {this.state.AllCallList &&
                    this.state.AllCallList.length &&
                    this.state.FilterCallList.map((call, index) => {
                      return <Call key={"call-" + index} {...call} />;
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
export default CallList;
