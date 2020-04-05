import React, { Component }  from "react";

class Home extends Component{
    render() {
        return (
            <div>
              <h2>Home</h2>
            </div>
          );
    }
    
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