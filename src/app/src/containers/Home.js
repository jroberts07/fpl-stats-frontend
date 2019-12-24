import React, { Component } from "react";

import FplStatsApi from "../components/FplStatsApi";
import { Table } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueTable: [],
      displayTable: ""
    };
  }

  async getLeagueTable() {
    FplStatsApi.leagueTable(localStorage.getItem('selectedLeagueID'), localStorage.getItem('playerCookie'))
        .then((rsp) => {
          this.setState({ leagueTable: rsp.data.standings });
          this.setState({ displayTable: "SHOW" });
        })
        .catch(() => {
          if (localStorage.getItem('selectedLeagueID')) {
            this.setState({ displayTable: "ERROR" });
          } 
          else {
            this.setState({ displayTable: "NONE_SELECTED" });
          }
        });
  }

  getMovementImage(entry) {
    if (entry.live_rank < entry.confirmed_rank) {
      return <img src="images/up_pos.png" alt="+" height="20!important" width="20!important"></img>
    } 
    else if (entry.live_rank > entry.confirmed_rank) {
      return <img src="images/down_pos.png" alt="*" height="20!important" width="20!important"></img>
    }
    else {
      return <img src="images/same_pos.png" alt="-" height="20!important" width="20!important"></img>
    }
  }

  renderTableHeader() {
    return [
      <th key="rank">Rank</th>,
      <th key="entry_name">Team</th>,
      <th key="gameweek_points">Gameweek</th>,
      <th key="total_points">Total</th>
    ]
 }

  renderTableData() {
    return this.state.leagueTable.map((entry, index) => { 
       return (
          <tr key={entry.entry_id} className={this.props.playerId == entry.entry_id ? "selected":""}>
             <td>{this.getMovementImage(entry)}{entry.live_rank}</td>
             <td><b className="name">{entry.entry_name}</b><p>{entry.player_name}</p></td>
             <td>{entry.live_points - entry.total_points}</td>
             <td>{entry.live_points}</td>
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