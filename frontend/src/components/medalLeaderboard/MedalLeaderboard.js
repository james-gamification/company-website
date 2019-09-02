import _ from 'lodash';
import React, { Component } from 'react';
import { Segment, Table, Header } from 'semantic-ui-react';
import './MedalLeaderboard.css';

class MedalLeaderboard extends Component {
  state = {
    column: 'total_medal',
    data: _.sortBy(this.props.data, ['total_medal']).reverse(),
    direction: 'descending'
  };

  handleSort = clickedColumn => () => {
    const { column, data } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]).reverse(),
        direction: 'descending'
      });

      return;
    }
  };

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <div className="medal-leaderboard-title">
          <Segment inverted>
            <Header as="h1">Medal Leaderboard</Header>
          </Segment>
        </div>
        <div>
          <div className="medal-leaderboard">
            <Segment inverted>
              <Table sortable celled fixed size="large">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      sorted={column === 'username' ? direction : null}
                      onClick={this.handleSort('username')}
                    >
                      Username
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'task_medal' ? direction : null}
                      onClick={this.handleSort('task_medal')}
                    >
                      Task Medal
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'meeting_medal' ? direction : null}
                      onClick={this.handleSort('meeting_medal')}
                    >
                      Meeting Medal
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'ranking_medal' ? direction : null}
                      onClick={this.handleSort('ranking_medal')}
                    >
                      Ranking Medal
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'total_medal' ? direction : null}
                      onClick={this.handleSort('total_medal')}
                    >
                      Total Medal
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(
                    data,
                    ({
                      task_medal,
                      meeting_medal,
                      ranking_medal,
                      total_medal,
                      username
                    }) => (
                      <Table.Row key={username}>
                        <Table.Cell>{username}</Table.Cell>
                        <Table.Cell>{task_medal}</Table.Cell>
                        <Table.Cell>{meeting_medal}</Table.Cell>
                        <Table.Cell>{ranking_medal}</Table.Cell>
                        <Table.Cell>{total_medal}</Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </Table>
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}
export default MedalLeaderboard;
