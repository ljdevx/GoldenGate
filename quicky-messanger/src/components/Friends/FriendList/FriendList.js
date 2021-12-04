import React, { Component } from "react";
import avatar3 from "../../../assets/media/avatar/3.png";
import ChatAction from "../../ChatAction/ChatAction";

import { ReactComponent as LocationMarker } from "../../../assets/media/heroicons/solid/location-marker.svg";
import { Link } from "react-router-dom";
import { ReactComponent as SearchSvg } from "../../../assets/media/icons/search.svg";
import Group from "./Group";
import Friend from "./Friend";

// Friend list component to list all friends
class FriendList extends Component {
  state = {
    search: "",
    AllFriends: [
      {
        name: "Albert K. Johansen",
        location: "San Fransisco, CA",
        active: true,
      },
      { name: "Alice R. Botello", location: "Brentwood, NY" },
      { name: "Brittany K. Williams", location: "Scranton, PA" },
      { name: "Christopher Garcia", location: "Riverside, CA" },
      { name: "Casey Mcbride", location: "Zephyr, NC" },
      { name: "Gemma Mendez", location: "Frederick, MD" },
      { name: "Katelyn Valdez", location: "Jackson, TN" },
      { name: "Katherine Schneider", location: "Saginaw, MI" },
      { name: "Maizie Edwards", location: "Greensboro, NC" },
      { name: "Susan K. Taylor", location: "Centerville, VA" },
    ],
    FilteredFriends: [],
    filteredGroups: [],
  };

  setVisible = () => {
    this.props.setMainVisible();
  };

  componentDidMount() {
    let groups = [];
    this.state.AllFriends.map((friend, index) => {
      if (
        groups.filter(
          (group) => group.g === friend.name.charAt(0).toLocaleLowerCase()
        ).length === 0
      ) {
        groups.push({
          g: friend.name.charAt(0).toLocaleLowerCase(),
          index,
        });
      }
      return true;
    });
    this.setState({
      FilteredFriends: [...this.state.AllFriends],
      filteredGroups: groups,
    });
  }

  handleSearch = (event) => {
    let filteredFriends = [...this.state.AllFriends].filter(
      (x) =>
        x.name
          .toLocaleLowerCase()
          .search(event.target.value.toLocaleLowerCase()) >= 0
    );
    let groups = [];
    filteredFriends.map((friend, index) => {
      if (
        groups.filter(
          (group) => group.g === friend.name.charAt(0).toLocaleLowerCase()
        ).length === 0
      ) {
        groups.push({
          g: friend.name.charAt(0).toLocaleLowerCase(),
          index,
        });
      }
      return true;
    });
    this.setState({
      search: event.target.value,
      FilteredFriends: filteredFriends,
      filteredGroups: groups,
    });
  };

  render() {
    return (
      <aside className="sidebar">
        <div className="tab-content">
          <div className="tab-pane active" id="friends-content">
            <div className="d-flex flex-column h-100">
              <div className="hide-scrollbar" id="friendsList">
                <div className="sidebar-header sticky-top p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-semibold mb-0">Friends</h5>
                    <ChatAction />
                  </div>
                  <div className="sidebar-sub-header">
                    <form className="form-inline w-100">
                      <div className="input-group w-100">
                        <input
                          type="text"
                          className="form-control search border-right-0 transparent-bg pr-0"
                          placeholder="Search users..."
                          value={this.state.search}
                          onChange={this.handleSearch}
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
                </div>

                <ul className="contacts-list" id="friendsTab">
                  {this.state.FilteredFriends.length
                    ? this.state.FilteredFriends.map((friend, index) => {
                        return (
                          <>
                            {this.state.filteredGroups.filter(
                              (x) => x.index === index
                            ).length ? (
                              <li>
                                <small className="font-weight-medium text-uppercase text-muted">
                                  {
                                    this.state.filteredGroups.filter(
                                      (x) => x.index === index
                                    )[0].g
                                  }
                                </small>
                              </li>
                            ) : null}
                            <Friend {...friend} />
                          </>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}
export default FriendList;
