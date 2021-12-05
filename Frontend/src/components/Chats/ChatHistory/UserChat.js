import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar2 from "../../../assets/media/avatar/2.png";
import avatar6 from "../../../assets/media/avatar/6.png";
import eth from "../../../assets/media/avatar/eth.png";
import photo1 from "../../../assets/media/shared-photos/01.jpg";
import photo2 from "../../../assets/media/shared-photos/02.jpg";
import photo3 from "../../../assets/media/shared-photos/03.jpg";

import { ReactComponent as BackToList } from "../../../assets/media/icons/backtolist.svg";
import { ReactComponent as SearchSvg } from "../../../assets/media/icons/search.svg";
import { ReactComponent as CallNowSvg } from "../../../assets/media/icons/callnow.svg";
import { ReactComponent as VerticalOptionDots } from "../../../assets/media/icons/verticaloptiondots.svg";
import { ReactComponent as InfoSvg } from "../../../assets/media/icons/infosvg.svg";
import { ReactComponent as MuteNotificationsSvg } from "../../../assets/media/icons/mutenotifications.svg";
import { ReactComponent as WallpaperSvg } from "../../../assets/media/icons/wallpaper.svg";
import { ReactComponent as ArchiveSvg } from "../../../assets/media/icons/archive.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/media/icons/delete.svg";
import { ReactComponent as BlockSvg } from "../../../assets/media/icons/block.svg";
import { ReactComponent as ChatDocFileSvg } from "../../../assets/media/icons/chatdocmessage.svg";

import { ReactComponent as ChatPlusSvg } from "../../../assets/media/icons/chatplus.svg";
import { ReactComponent as EmojiSvg } from "../../../assets/media/icons/emoji.svg";
import { ReactComponent as GallarySvg } from "../../../assets/media/icons/gallary.svg";
import { ReactComponent as AudioSvg } from "../../../assets/media/icons/audio.svg";
import { ReactComponent as ContactSvg } from "../../../assets/media/icons/contact.svg";
import { ReactComponent as LocationSvg } from "../../../assets/media/icons/location.svg";
import { ReactComponent as PollSvg } from "../../../assets/media/icons/poll.svg";
import { ReactComponent as SendMessageSvg } from "../../../assets/media/icons/sendmessage.svg";
import { ReactComponent as AddContactSvg } from "../../../assets/media/icons/addcontact.svg";
import { ReactComponent as HeartSvg } from "../../../assets/media/icons/heart.svg";
import { ReactComponent as CloseSvg } from "../../../assets/media/icons/close.svg";

import { ReactComponent as DocumentsSvg } from "../../../assets/media/icons/documents.svg";
import { ReactComponent as ProfileDocumentsSvg } from "../../../assets/media/icons/profiledocuments.svg";
import { Dropdown } from "react-bootstrap";
import MessageDropdown from "./Dropdowns/MessageDropdown";
import DocumentOptionDropdown from "./Dropdowns/DocumentOptionDropdown";

import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { ThemeColor } from "../../../Config/Config";
import "../Chats.css";

// User  chat detail component - chat with users
class UserChat extends Component {
  state = {
    showProfileDetail: false,
    chatSearchBox: false,
    showUserInformation: true,
    showLastMedia: true,
    showDocuments: true,
    emojiWidth: window.innerWidth / 16 + "rem",
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    message: "",
    messages: [],
    chatID: '',
    userAddress: '',
    otherAddress: ''
  };

  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();


    console.log(props)
    this.fetchConversation(props.chatID);
    window.onresize = () => {
      let width = window.innerWidth / 16;
      if (width >= 50) width = 50;
      this.setState({ emojiWidth: width + "rem" });
    };
  }

  attachMessageHandler = (event) => {
    event.preventDefault();

    var body = {};
    body.fromAddress = 'c454dd6eb-d31f-4fbf-b3e6-44ecf2070b77'; //c454dd6eb-d31f-4fbf-b3e6-44ecf2070b77
    body.fromChain = 'ETH';
    body.conversationId = 'c454dd6eb-d31f-4fbf-b3e6-44ecf2070b77';
    body.message = 'Heyyy'; //this.state.message;
    body.signaure = '0xf14098cae6b5717d37b563da93b28eaa8ea75460ac16452effa8ec128d2c41284f6fd7b2bc17e18911e20bd1e5685fff08144f76cead08fd45999676a8b827671b';

    fetch( 'https://api.creatornfts.xyz/api/w3mail/sendMessage', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {

        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
  fetchConversation = (chatID) => {
    // console.log(`props: ${this.props}`)
    setTimeout(() => {
      const address = window.ethereum.selectedAddress.toLowerCase();  // "0x3aaa363e21424aB8Fb598f5763ba874bbb0B600b"; // 
      const token = localStorage.getItem('token'); //TODO // "0xf14098cae6b5717d37b563da93b28eaa8ea75460ac16452effa8ec128d2c41284f6fd7b2bc17e18911e20bd1e5685fff08144f76cead08fd45999676a8b827671b"; 
      fetch(`https://api.creatornfts.xyz/api/w3mail/conversations/${chatID}?address=${address}&chain=ETH&signature=${token}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            var params = window.location.href.split("/");
            this.setState({
              messages: responseJson.data.messages,
            });
            this.setState({ userAddress: window.ethereum.selectedAddress })

            console.log(this.state)
          } else {
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500)
  }

  toggleShowProfileDetail = () => {
    this.setState({ showProfileDetail: !this.state.showProfileDetail });
    document.body.click();
  };

  toggleChatSearchBox = () => {
    this.setState({ chatSearchBox: !this.state.chatSearchBox });
    document.body.click();
  };

  toggleShowUserInformation = () => {
    this.setState({ showUserInformation: !this.state.showUserInformation });
  };

  toggleShowLastMedia = () => {
    this.setState({ showLastMedia: !this.state.showLastMedia });
  };

  toggleShowDocuments = () => {
    this.setState({ showDocuments: !this.state.showDocuments });
  };

  // componentDidMount() => {
  //   this.messagesEndRef.current.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleEmojiSelect = (param) => {
    this.setState({ message: this.state.message });
  };

  render() {
    
    const { message } = this.state;
    return (
      <main className={"main main-visible"}>
        <div className="chats">
          <div className="chat-body">
            <div className="chat-header">
              <Link className="contacts-link" to="/Chats">
                <button
                  className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none"
                  type="button"
                >
                  <BackToList />
                </button>
              </Link>
              <div className="media chat-name align-items-center text-truncate">
                <div className="avatar avatar-online d-none d-sm-inline-block mr-3">
                  <img src={eth} alt=""></img>
                </div>
                <div className="media-body align-self-center ">
                  <h6 className="text-truncate mb-0">Catherine Richardson</h6>
                  {/* <small className="text-muted">Online</small> */}
                </div>
              </div>
              <ul className="nav flex-nowrap">

                <li className="nav-item list-inline-item d-none d-sm-block mr-0">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="text-muted hw-20 mt-2"
                      as={VerticalOptionDots}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <InfoSvg className="hw-20 mr-2" />
                        <span>View Transaction History</span>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item list-inline-item d-sm-none mr-0">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="text-muted hw-20"
                      as={VerticalOptionDots}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <InfoSvg className="hw-20 mr-2" />
                        <span>View Transaction History</span>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
            <div
              className={
                "border-bottom px-3 collapse " +
                (this.state.chatSearchBox ? "show" : "")
              }
            >
              <div className="container-xl py-2 px-0 px-md-3">
                <div className="input-group bg-light ">
                  <input
                    type="text"
                    className="form-control form-control-md border-right-0 transparent-bg pr-0"
                    placeholder="Search..."
                  ></input>
                  <div className="input-group-append">
                    <span className="input-group-text transparent-bg border-left-0">
                      <SearchSvg className="hw-20 text-muted" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="chat-content p-2">
              <div className="container">
                <div
                  className="message-divider pb-2"
                  data-label="Yesterday"
                ></div>
                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        FROM A CONTRACT: thing you receive
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={eth}></img>  {/* update impage */}
                    </div>
                    <span className="message-date">9:12am</span> {/* update timestamp */}
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message self">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        TO A CONTRACT: thing you send
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={eth}></img> {/* update timestamp */}
                    </div>
                    <span className="message-date" ref={this.messagesEndRef}> {/*append to last message */}
                      Just now
                    </span>

                    <MessageDropdown />
                  </div>
                </div>


              </div>
              <div className="chat-finished" id="chat-finished"></div>
            </div>

            <div className="chat-footer">
              <div className="form-row align-items-center">
                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend mr-sm-2 mr-1">
                      <Dropdown>
                        <Dropdown.Toggle
                          className="text-muted hw-20"
                          as={ChatPlusSvg}
                        ></Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Link className="dropdown-item" to="#">
                            <GallarySvg className="hw-20 mr-2" />
                            <span>Gallery</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <AudioSvg />
                            <span>Audio</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <ChatDocFileSvg className="hw-20 mr-2" />
                            <span>Document</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <ContactSvg />
                            <span>Contact</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <LocationSvg />
                            <span>Location</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <PollSvg />
                            <span>Poll</span>
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>


{/* ///////////////////////////////////////////*/}
                    <input
                      type="text"
                      className="form-control transparent-bg border-0 no-resize hide-scrollbar"
                      placeholder="Write your message..."
                      rows="1"
                      value={this.state.message}
                      onChange={this.handleMessageChange}
                    ></input>
{/* ///////////////////////////////////////////*/}
                    <div className="input-group-prepend mr-sm-2 mr-1">
                      <Dropdown className="w-100">
                        <Dropdown.Toggle
                          className="text-muted hw-20"
                          as={EmojiSvg}
                        ></Dropdown.Toggle>
                        <Dropdown.Menu className="border-0 color-none">
                          <Picker
                            className="emoji-picker"
                            title="Pick your emoji…"
                            emoji="point_up"
                            showPreview={true}
                            set="facebook"
                            theme={
                              this.state.themeColor === ThemeColor.Light
                                ? "light"
                                : "dark"
                            }
                            style={{
                              width: this.state.emojiWidth,
                              maxWidth: "65rem",
                            }}
                            onSelect={this.handleEmojiSelect}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div
                    className="btn btn-primary btn-icon rounded-circle text-light mb-1"
                    role="button"
                  >
                    <SendMessageSvg />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              "chat-info " +
              (this.state.showProfileDetail ? "chat-info-visible" : "")
            }
          >
            <div className="d-flex h-100 flex-column">
              <div className="chat-info-header px-2">
                <div className="container-fluid">
                  <ul className="nav justify-content-between align-items-center">
                    <li className="text-center">
                      <h5 className="text-truncate mb-0">Profile Details</h5>
                    </li>
                    <li className="nav-item list-inline-item">
                      <Link
                        className="nav-link text-muted px-0"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <CloseSvg />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hide-scrollbar flex-fill">
                <div className="text-center p-3">
                  <div className="avatar avatar-xl mx-5 mb-3">
                    <img className="avatar-img" src={eth} alt=""></img>
                  </div>
                  <h5 className="mb-1">WALLET ADDRESS</h5>

                </div>
                <div className="chat-info-group">
                  <Link
                    className="chat-info-group-header"
                    data-toggle="collapse"
                    to="#"
                    onClick={this.toggleShowUserInformation}
                  >
                    <h6 className="mb-0"> Transaction History</h6>
                    <InfoSvg className="hw-20 text-muted" />
                  </Link>


                </div>
                <div className="chat-info-group">


                  <div
                    className={
                      "chat-info-group-body collapse " +
                      (this.state.showDocuments ? "show" : "")
                    }
                    id="shared-files"
                  >

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default UserChat;

