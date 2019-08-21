import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  async componentDidMount() {
    if (localStorage.getItem('entry_id')) {
      this.userHasAuthenticated(true);
    }
    this.setState({ isAuthenticating: false });
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  handleLogout = async event => {
    localStorage.removeItem('entry_id')
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating &&
      <div className="app container">
        <Navbar bg="light">
          <Navbar.Brand href="/">FPL Stats</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Nav>
            {this.state.isAuthenticated
              ? <Nav.Link onClick={this.handleLogout} className="btn btn-outline-secondary">Logout</Nav.Link>
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
