import _ from 'lodash';
import React, { Component } from 'react';
import { Segment, Table, Header } from 'semantic-ui-react';
import './Leaderboard.css';

class Leaderboard extends Component {
  state = {
    column: 'total_points',
    data: _.sortBy(this.props.data, ['total_points']).reverse(),
    direction: 'descending'
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]).reverse(),
        direction: 'descending'
      });

      return;
    }
    if (column === 'name') {
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending'
      });
    }
  };

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <div className="leaderboard-title">
          <Segment inverted>
            <Header as="h1">Leaderboard</Header>
          </Segment>
        </div>
        <div>
          <div className="leaderboard">
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
                      sorted={column === 'task_points' ? direction : null}
                      onClick={this.handleSort('task_points')}
                    >
                      Task Points
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'meeting_points' ? direction : null}
                      onClick={this.handleSort('meeting_points')}
                    >
                      Meeting Points
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'commit_points' ? direction : null}
                      onClick={this.handleSort('commit_points')}
                    >
                      Commit Points
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'review_points' ? direction : null}
                      onClick={this.handleSort('review_points')}
                    >
                      Review Points
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'total_points' ? direction : null}
                      onClick={this.handleSort('total_points')}
                    >
                      Total Points
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(
                    data,
                    ({
                      task_points,
                      meeting_points,
                      commit_points,
                      review_points,
                      total_points,
                      username
                    }) => (
                      <Table.Row key={username}>
                        <Table.Cell>{username}</Table.Cell>
                        <Table.Cell>{task_points.toFixed(2)}</Table.Cell>
                        <Table.Cell>{meeting_points.toFixed(2)}</Table.Cell>
                        <Table.Cell>{commit_points.toFixed(2)}</Table.Cell>
                        <Table.Cell>{review_points.toFixed(2)}</Table.Cell>
                        <Table.Cell>{total_points.toFixed(2)}</Table.Cell>
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
export default Leaderboard;
