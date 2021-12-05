import React, { Component } from "react";

// import { useMetaMask } from "metamask-react";

const MetamaskElement = () => {
    // const { status, connect, account } = useMetaMask();
    // if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    // if (status === "unavailable") return <div>MetaMask not available :(</div>

    // if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

    // if (status === "connecting") return <div>Connecting...</div>

    // if (status === "connected") return <div>Connected account: {account}</div>
    return null;
}

const withMetamaskHOC = (Component) => {
    return (props) => {
        // const { status, connect, account } = useMetaMask();

        // return <Component metamask={{ status, connect, account }} {...props} />;
    };
};


export { MetamaskElement, withMetamaskHOC };