import getWeb3 from './getWeb3';
 
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async (dispatch) => {
  const web3 = await getWeb3();
  console.log('web3', web3);
  const accounts = await web3.eth.getAccounts();
  console.log('accounts', accounts);
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
      account
    });
  } else {
    console.log('Account not found');
  }
};
