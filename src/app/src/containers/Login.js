import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry_id: "",
      player_cookie: ""
    };
  }

  validateForm() {
    return this.state.entry_id.length > 0 && this.state.player_cookie.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    localStorage.setItem('entry_id', this.state.entry_id);
    this.props.userHasAuthenticated(true);
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="entry_id" bsSize="large">
            <Form.Label>Entry ID:</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.entry_id}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="player_cookie" bsSize="large">
            <Form.Label>Player Cookie:</Form.Label>
            <Form.Control
              value={this.state.player_cookie}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
