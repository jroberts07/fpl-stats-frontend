import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="lander">
          <h1>Welcome {this.props.playerName}</h1>
          <p>FPL Stats is coming soon...</p>
        </div>
      </div>
    );
  }
}