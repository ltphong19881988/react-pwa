import getWeb3 from './getWeb3';
import PUCT from "../block_chain/PUCT_token.json";

 
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async (dispatch) => {
  const web3 = await getWeb3();
  console.log('web3', web3);
  const accounts = await web3.eth.getAccounts();
  
//   if (web3.currentProvider.connection.networkVersion !== '3') {
//     // alert('Unknown network, please change network to Ropsten network');
//     console.log('Unknown network, please change network to Ropsten network');
//     return;
//   }
  if (accounts.length > 0) {
    const account = accounts[0];
    let balance = await web3.eth.getBalance(account);
    dispatch({
      type: WEB3_CONNECT,
      web3,
      account, 
      balance,
    });
  } else {
      console.log('Account not found');
  }
};

///////////////////////////////////////////////////

export const INIT_CONTRACT = 'INIT_CONTRACT';
export const instantiateContracts = () => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.web3;
  // const networkId = process.env.REACT_APP_NETWORK_ID;
  // let metaCoinAddress = MetaCoin.networks[networkId].address;
  let metaCoin = new web3.eth.Contract(PUCT.ABI, PUCT.address, {
    transactionConfirmationBlocks: 1
  });
  dispatch({
    type: INIT_CONTRACT,
    metaCoin
  });
};


///////////////////////////////////////////////////

export const GET_COIN_BALANCE = 'GET_COIN_BALANCE';
export const getCoinBalance = () => async (dispatch, getState) => {
  const state = getState();
  const metaCoin = state.metaCoin;
  const account = state.account;
  let coin_balance = await metaCoin.methods.balanceOf(account).call({ from: account });
  console.log('coin_balance', coin_balance);
  dispatch({
    type: GET_COIN_BALANCE,
    coin_balance
  });
};