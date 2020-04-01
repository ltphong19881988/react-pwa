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
        <h2>About</h2>
        </div>
    );    
}

class Profile extends Component{
    render() {
        return (
            <div>
            <h2>Profile</h2>
            </div>
          );
    }
    
}

export {Home, About, Profile}