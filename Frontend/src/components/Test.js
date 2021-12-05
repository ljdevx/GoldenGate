import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { ThemeColor } from "../Config/Config";
import { tsExpressionWithTypeArguments } from "@babel/types";
import { ethers } from "ethers";

// SignIn component
class SignIn extends Component {
  state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    isRemember: false,
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

  toggleIsremember = () => {
    this.setState({ isRemember: !this.state.isRemember });
  };

  async signMessage() {
      try {
        var message = "Login to the app";
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        console.log(signature);
        localStorage.setItem('token', signature)
        window.location.href = "Chats";
      } catch(err) {
          console.log(err)
      }
  }

  render() {
    return (
      <div className={"main-layout card-bg-1"}>
        <div className="container d-flex flex-column">
          <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
            <div className="col-12 col-md-6 col-lg-5 col-xl-4">
              <h1 className="font-weight-bold">Sign in</h1>
              <p className="text-dark mb-3">
                We are Different, We Make You Different.
              </p>
              <form className="mb-3">
            
                <Link
                  onClick={() => this.signMessage()}
                  className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold"
                >
                  Sign in
                </Link>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
