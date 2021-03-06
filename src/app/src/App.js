import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Routes from "./Routes";

import "./css/main.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      playerName: null,
      playerId: null,
      playerLeagues: [],
      selectedLeagueName: "Select a league",
      selectedLeagueID: null
    };
  }
  async componentDidMount() {
    if (
      localStorage.getItem('playerLeagues') &&
      localStorage.getItem('playerName') &&
      localStorage.getItem('playerId') &&
      localStorage.getItem('playerCookie') &&
      localStorage.getItem('selectedLeagueID')
    ) { 
      try {
        let leagues = JSON.parse(localStorage.getItem('playerLeagues'));
        this.setPlayerData(localStorage.getItem('playerName'), parseInt(localStorage.getItem('playerId')), leagues);
        this.setSelectedLeague(localStorage.getItem('selectedLeagueID'), leagues);
        this.userHasAuthenticated(true);
      }
      catch(error) {
        this.userHasAuthenticated(false);
      }
      finally {
        this.setState({ isAuthenticating: false });
      }
    }
    else {
      this.userHasAuthenticated(false);
      this.setState({ isAuthenticating: false });
    }
    
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  setPlayerData = (playerName, playerId, playerLeagues) => {
    this.setState(
      {
        playerName: playerName,
        playerId: playerId,
        playerLeagues: playerLeagues
      }
    )
  }
  handleLogout = async event => {
    localStorage.clear();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
  setSelectedLeague(id, leagues){
    var league = leagues.find(league => {
      return league.id === parseInt(id)
    })
    this.setState({
      "selectedLeagueName": league.name,
      "selectedLeagueID": league.id
    });
    localStorage.setItem('selectedLeagueID', league.id);
  }
  handleLeagueSelect = (eventKey, event) => {
    this.setSelectedLeague(eventKey, this.state.playerLeagues)
    window.location.reload();
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      playerName: this.state.playerName,
      playerId: this.state.playerId,
      userHasAuthenticated: this.userHasAuthenticated,
      setPlayerData: this.setPlayerData
    };
    return (
      !this.state.isAuthenticating &&
      <div className="app container">
        <Navbar collapseOnSelect expand="sm">
          <Navbar.Brand href="/">FPL Stats</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Nav>
            {this.state.isAuthenticated
              ? [
                <NavDropdown key="nav-dropdown" className="mr-4" title={this.state.selectedLeagueName} id="basic-nav-dropdown" onSelect={this.handleLeagueSelect}>
                  {this.state.playerLeagues.map((item, index) => (
                    <NavDropdown.Item eventKey={item.id} href="#" key={item.id}>{item.name}</NavDropdown.Item>
                  ))}
                </NavDropdown>,
                <Nav.Link key="login-link" onClick={this.handleLogout} className="btn btn-outline-secondary">Logout</Nav.Link>
              ]
              : <Nav.Link href="/login" className="btn btn-outline-secondary">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
