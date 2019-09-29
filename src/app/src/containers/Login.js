import React, { Component } from "react";
import { Alert, Button, Form } from "react-bootstrap";

import FplStatsApi from "../components/FplStatsApi";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entryId: "",
      playerCookie: "",
      showLoginAlert: false
    };
  }

  setShowLoginAlert(show) {
    this.setState({showLoginAlert: show});
  }

  validateForm() {
    return this.state.entryId.length > 0 && this.state.playerCookie.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    FplStatsApi.entryData(this.state.entryId, this.state.playerCookie)
      .then((rsp) => {
        localStorage.setItem('entryId', this.state.entryId);
        localStorage.setItem('playerCookie', this.state.playerCookie);
        localStorage.setItem('playerName', rsp.data.name)
        localStorage.setItem('playerLeagues', JSON.stringify(rsp.data.leagues))
        this.props.userHasAuthenticated(true);
        this.props.setPlayerData(rsp.data.name, rsp.data.leagues);
        this.props.history.push("/");
      })
      .catch(() => {
        this.setShowLoginAlert(true)
      });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="entryId">
            <Form.Label>Entry ID:</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.entryId}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="playerCookie">
            <Form.Label>Player Cookie:</Form.Label>
            <Form.Control
              value={this.state.playerCookie}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <br></br>
          {this.state.showLoginAlert &&
          <Alert variant="danger" onClose={() => this.setShowLoginAlert(false)} dismissible>
            Ooops! Login Failed.
          </Alert>
          }
        </form>
      </div>
    );
  }
}
