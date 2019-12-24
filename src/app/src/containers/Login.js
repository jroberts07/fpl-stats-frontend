import React, { Component } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Popup from "reactjs-popup";

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
    localStorage.clear();
    FplStatsApi.entryData(this.state.entryId, this.state.playerCookie)
      .then((rsp) => {
        localStorage.setItem('entryId', this.state.entryId);
        localStorage.setItem('playerCookie', this.state.playerCookie);
        localStorage.setItem('playerName', rsp.data.name)
        localStorage.setItem('playerId', parseInt(this.state.entryId))
        localStorage.setItem('playerLeagues', JSON.stringify(rsp.data.leagues))
        this.props.userHasAuthenticated(true);
        this.props.setPlayerData(rsp.data.name, parseInt(this.state.entryId), rsp.data.leagues);
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
            <Popup 
              trigger={<i className="float-right fa fa-question-circle"></i>} 
              modal
            >
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>&times;</button>
                  <div className="header"><h2> Where to find your Entry ID </h2></div>
                  <div className="content">
                    <p>
                      Your entry ID can be found by visiting <a href="https://fantasy.premierleague.com" target="_blank" rel="noopener noreferrer">the FPL website </a> 
                      and visiting the points section. You can then get the ID from the URL as indicated in the picture below.
                    </p>
                    <img src="images/entry_id.png" alt="Sorry. Failed to load :("></img>
                  </div>
                </div>
              )}
            </Popup>
            <Form.Control
              autoFocus
              value={this.state.entryId}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="playerCookie">
            <Form.Label>Player Cookie:</Form.Label>
            <Popup 
              trigger={<i className="float-right fa fa-question-circle"></i>} 
              modal
            >
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>&times;</button>
                  <div className="header"><h2> Where to find your Player Cookie </h2></div>
                  <div className="content">
                    <p>
                      Your player cookie can be found by visiting <a href="https://fantasy.premierleague.com" target="_blank" rel="noopener noreferrer">the FPL website. </a> 
                      Once there you will need to login and follow these steps:
                    </p>
                    <ol>
                      <li>Open developer tools and go to the cookies section.</li>
                      <li>Copy the one named pl_profile excluding the speech marks.</li>
                    </ol> 
                    <p>Play the video below if you cannot follow the steps:</p>
                    <video controls>
                      <source src="images/player_cookie.mp4" type="video/mp4"></source>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </Popup>
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
