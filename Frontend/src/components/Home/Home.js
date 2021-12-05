import React, { Component } from "react";
import LightSkin from "../../assets/media/ui/light-skin.jpg";
import DarkSkin from "../../assets/media/ui/dark-skin.jpg";

import LigntSignIn from "../../assets/media/ui/ls-signin.jpg";
import DarkSignIn from "../../assets/media/ui/ds-signin.jpg";
import LightSignUp from "../../assets/media/ui/ls-signup.jpg";
import DarkSignUp from "../../assets/media/ui/ds-signup.jpg";
import LightResetPassword from "../../assets/media/ui/ls-reset-password.jpg";
import DarkResetPassword from "../../assets/media/ui/ds-reset-password.jpg";
import RTLLIghtSkin from "../../assets/media/ui/rtl-default.jpg";
import RTLDarkSkin from "../../assets/media/ui/rtl-dark.jpg";

import { ReactComponent as LogoSvg } from "../../assets/media/logo.svg";
import RefreshSvg from "../../assets/media/icons/refresh.svg";
import QuestionSvg from "../../assets/media/icons/question.svg";
import PencilSvg from "../../assets/media/icons/pencil.svg";
import ResponsiveSvg from "../../assets/media/icons/responsive.svg";

import { Link } from "react-router-dom";
import { ThemeColor } from "../../Config/Config";
import { Accordion, Card } from "react-bootstrap";

import { useMetaMask } from "metamask-react";

const MetamaskElement = () => {
  const { status, connect, account } = useMetaMask();
  if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

  if (status === "unavailable") return <div>MetaMask not available :(</div>

  if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

  if (status === "connecting") return <div>Connecting...</div>

  if (status === "connected") return <div>Connected account: {account}</div>
  return null;
}
// Home page component
class Home extends Component {
  state = {
    themeColor: ThemeColor.Light,
  };

  // Load selected theme
  componentDidMount() {
    this.setState({ themeColor: ThemeColor.Light });
    let classList = document.body.classList;
    if (classList.length) document.body.classList.remove("dark-skin");
    document.body.removeAttribute("dir");
  }

  // Change theme color
  selectThemeColor = (color, isRTL = false) => {
    localStorage.setItem("theme", color);
    if (isRTL) localStorage.setItem("rtl", isRTL);
    else localStorage.removeItem("rtl");
    this.setState({ themeColor: color });
  };

  

  
  render() {
    return (
      <>
        <section className="bg-light theme-shadow card-bg-1 py-5">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-10">
                <div className="badge badge-secondary">new</div>

                <h1 className="display-4 font-weight-semibold text-primary">
                  Golden Gate
                </h1>

                <p>
                  The easiest way to commuicate with other wallets.
                </p>

                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center align-items-sm-start mt-4">
                  <Link
                    to="/Chats"
                    className="btn btn-md btn-primary mb-2 mx-2"
                    onClick={() => {
                      this.selectThemeColor(ThemeColor.Light);
                    }}
                  >
                    View demo
                  </Link>
                </div>
                <div>
                    <MetamaskElement/>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default Home;
