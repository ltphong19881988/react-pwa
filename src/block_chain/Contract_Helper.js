import React, { Component }  from "react";
import Web3 from 'web3';

const getWeb3 = async () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        return web3;
      } catch (error) {
        console.error(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      console.log('Injected web3 detected.');
      return web3;
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3dc8ec941c1a4d0480fe420a0db14a8f');
      const web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
      return web3;
    }
};

class Contract_Helper extends Component {
   
}

export  {getWeb3, Contract_Helper};