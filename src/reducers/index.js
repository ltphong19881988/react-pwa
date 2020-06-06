import * as actions from '../actions';
 
const initialState = {
  web3: null,
  account: null,
  balance: null,
  metaCoin: null,
  coin_balance: null,
  check_web3: true,
};
 
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        account: action.account,
        balance : action.balance
      };
    case actions.INIT_CONTRACT:
      return {
        ...state,
        metaCoin: action.metaCoin
      };
    case actions.GET_COIN_BALANCE:
      return {
        ...state,
        coin_balance: action.coin_balance
      };
    case "CHECK_WEB3" :
      return {
        ...state,
        check_web3: action.check_web3
      }
    default:
      return state;
  }
};
 
export default rootReducer;