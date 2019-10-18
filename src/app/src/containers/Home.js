import React, { Component } from "react";

import FplStatsApi from "../components/FplStatsApi";
import { Table } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueTable: [],
      displayTable: "ERROR"
    };
  }

  async getLeagueTable() {
    FplStatsApi.leagueTable(localStorage.getItem('selectedLeagueID'), localStorage.getItem('playerCookie'))
        .then((rsp) => {
          this.setState({ leagueTable: rsp.data.standings });
          this.setState({ displayTable: "SHOW" });
        })
        .catch(() => {
          this.setState({ displayTable: "ERROR" });
        });
  }

  renderTableHeader() {
    return [
      <th key="rank">Rank</th>,
      <th key="entry_name">Team</th>,
      <th key="player_name">Player</th>,
      <th key="gameweek_points">Gameweek</th>,
      <th key="total_points">Total</th>
    ]
 }

  renderTableData() {
    return this.state.leagueTable.map((entry, index) => { 
       return (
          <tr key={entry.entry_name}>
             <td>{entry.rank}</td>
             <td>{entry.entry_name}</td>
             <td>{entry.player_name}</td>
             <td>{entry.gameweek_points}</td>
             <td>{entry.total_points}</td>
          </tr>
       )
    })
 }

  async componentDidMount() {
    if (this.props.isAuthenticated) {
      await this.getLeagueTable();
    }
  }
  
  render() {
    return (
      <div className="home">
        {!this.props.isAuthenticated &&
          <div className="lander">
            <h1>Welcome</h1>
            <p>Please login.</p>
          </div>
        }
        {this.state.displayTable === "NONE_SELECTED" &&
          <div className="lander">
            <h1>Welcome {this.props.playerName}</h1>
            <p>Please select which league you would like to view.</p>
          </div>
        }
        {this.state.displayTable === "ERROR" &&
          <div className="lander">
            <h1>Sorry {this.props.playerName}</h1>
            <p>Unfortunatley we could not load the live league table at this time.</p>
          </div>
        }
        {this.state.displayTable === "SHOW" &&
          <div>
              <Table id='fpl-live-table'>
                <tbody>
                  <tr id='table-header'>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
                </tbody>
              </Table>
          </div>
        }
      </div>
    );
  }
}