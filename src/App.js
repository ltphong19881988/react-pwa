import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import './custom.css';
import MobileMenu from './Template/mobile-menu';
import {GameView} from './View/Game';
import {Home, About, Profile} from './View/Home';


const NavBar = () => (
  <div className="navbar">
    <h3>Task Manager</h3>
    <Link to="/">Current Tasks feaw feaw</Link>
    <Link to="/completed">Completed Tasks fewa fw</Link>
  </div>
);

const Template = (props) => (
  <div>
    <NavBar />
    <p className="page-info">
      {props.title}:
    </p>
    <ul className={props.status}>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
    </ul>
  </div>
);

const CurrentTasks = () => (
  <Template title="Current Tasks" status="Current"/>
);

const CompletedTasks = () => (
  <Template title="Completed Tasks" status="Completed"/>
);

class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <div>
          
          <Route exact path="/" component={CurrentTasks}/>
          <Route path="/completed" component={CompletedTasks}/>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/game">
            <GameView />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <div className='footer'>
          <Container>
            <Row>
            <Col className="nav-btn" xs={3}>
                <Link to="/">Home</Link>
            </Col>
            <Col className="nav-btn" xs={3}>
              <Link to="/game">Game</Link>
            </Col>
            <Col className="nav-btn" xs={3}>
                <Link to="/about">About</Link>
            </Col>
            <Col className="nav-btn" xs={3}>
                <Link to="/profile">Profile</Link>
            </Col>
            </Row>
          </Container>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;