import React, { Component } from "react";
import { ethers } from "ethers";
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
        name: "0x",
        location: "eth",
        active: true,
      }
    ],
    FilteredFriends: [],
    filteredGroups: [],
    startChatVisible: this.props.startChatVisible
  };

  setVisible = () => {
    this.props.setMainVisible();
  };

  componentDidMount() {
    let groups = [];
    this.getTransactionAddresses();
    // this.state.AllFriends = historyAddresses.forEach(transaction => { return { trans: transaction.address, location: transaction.time } })
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

  getTransactionAddresses = async (event) => {
    // const userAddress = "0x9641969bb391A4c125553979D2bA9945f101Dd46"; // TODO@allenn: replace with users address
    const userAddress = "0x9641969bb391A4c125553979D2bA9945f101Dd46";
    var provider = new ethers.providers.EtherscanProvider("ropsten", "SGQI4UH2ANC66XKUQB1FJXD9BEFZWXK6RQ"); // TODO@allenn: replace with mainnet

    var history = await provider.getHistory(userAddress);
    var addressesToTxMap = new Map(); // Address : # of transactions

    history.forEach(transaction => {
      let toFromArr = [transaction.to, transaction.from];
      toFromArr.forEach(toFromAddress => {
        if (addressesToTxMap.has(toFromAddress)) {
          addressesToTxMap.set(toFromAddress, addressesToTxMap.get(toFromAddress) + 1);
        } else {
          addressesToTxMap.set(toFromAddress, 1);
        }
      })
    })
    addressesToTxMap.delete(userAddress);
    addressesToTxMap.delete(null);

    var addrToFriends = []

    addressesToTxMap.forEach((val, key, map) => {
      addrToFriends.push({ name: key, location: val })
    })
    // console.log(addressesToTxMap)
    // this.addressesToEns(addrToFriends);
    // convert to friend list format
    this.setState({
      AllFriends: [...addrToFriends],
      FilteredFriends: [...addrToFriends]
    })
    // return addresses;
  }

  // TODO: Make this function work
  // addressesToEns = (addresses) => {
  //   var provider = new ethers.providers.EtherscanProvider("homestead", "SGQI4UH2ANC66XKUQB1FJXD9BEFZWXK6RQ"); // TODO@allenn: replace with mainnet
  //   console.log(addresses)
  //   addresses.forEach(friend => {
  //     if (friend.name) {

  //       provider.lookupAddress(friend.name).then(function (name) {
  //         console.log(`checking address ${friend.name}`);
  //         console.log(`name was ${name}`); // TODO: This throws a 403 error
  //         // 'registrar.firefly.eth'
  //       });
  //     }
  //   })
  // }


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
                    <h5 className="font-weight-semibold mb-0">Address Book</h5>
                    {this.state.startChatVisible ?

                      <ChatAction />

                      :
                      ""

                    }

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
