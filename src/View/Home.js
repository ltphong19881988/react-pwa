import React, { Component, useState, useEffect }  from "react";
import { useHistory } from 'react-router-dom';
import { Provider, useDispatch, useSelector  } from 'react-redux';
import * as actions from '../actions';
import PUCT from "../block_chain/PUCT_token.json";
// import {getWeb3, Contract_Helper} from '../block_chain/Contract_Helper';
import store from '../store';



class Home extends Component{
    constructor(props) {
        super(props);
        // Don't call this.setState() here!

    }

    redirect() {
        this.props.history.push('/main')
    } 

    componentDidMount(){
        // await (actions.web3Connect());
    }

    render() {
        
        return (
            <div>
                <h2>Contract Address : {PUCT.address}</h2>
                <Provider store={store}> 
                    <DARK /> 
                </Provider>
            </div>
            
          );
    }
    
}

function DARK() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {check_web3, balance, account, coin_balance } = useSelector((state) => ({
        check_web3 : state.check_web3,
        balance: state.balance,
        account: state.account,
        coin_balance : state.coin_balance
      }));
    
    useEffect(() => {
        async function fetWeb3Init() {
            console.log('check_web3', check_web3);
            await dispatch(actions.web3Connect());
            console.log('check_web3', check_web3);
            await dispatch(actions.instantiateContracts());
            await dispatch(actions.getCoinBalance());
        //   await dispatch(actions.getBalance());
         console.log(account);
        //   if(account == null){
        //     history.push('/abc')
        //   }


        }
     
     
        fetWeb3Init();
      }, [dispatch]);


    return (
        <div>
        Your ETH Address : {account}
        <br/>
        Your ETH Balance : {balance}
        <br/>
        Your Token Balance : {coin_balance}
        </div>
    )
}

function About() {   
    return (
        <div>
        About
        </div>
    )
}

class Profile extends Component{
    constructor(props){
        super(props);
        
    }
    state = {
        screenOrientation: 'portrait'
    }
    
    isPortraitMode = () => {
        console.log(this.state);
        const { screenOrientation } = this.state;
        return screenOrientation === 'portrait';
    }

    setScreenOrientation = () => {
        console.log(window.innerWidth , window.innerHeight);
        if (window.matchMedia("(orientation: portrait)").matches) {
            console.log('orientation: portrait');
            this.setState({
                screenOrientation: 'portrait'
            });
        }

        if (window.matchMedia("(orientation: landscape)").matches) {
            console.log('orientation: landscape');
            this.setState({
                screenOrientation: 'landscape'
            });
        }
    }

    componentDidMount() {
        window.addEventListener('orientationchange', this.setScreenOrientation);
    }

    render() {
        // console.log(`orientation: from render: isPortraitMode = ${this.isPortraitMode()}`);
        
        return (
            <div>
              <h2>Profile</h2>
            </div>
          );
    }

}

export {Home, About, Profile}