import React, { Component } from 'react';
import {
  Form,
  Modal,
  Tab,
  Message,
  Dimmer,
  Loader,
  Segment,
  Header
} from 'semantic-ui-react';
import SprintStatList from './SprintStatList';
import PercentageChart from '../chart/percentageChart';
import RankingChart from '../chart/rankingChart';
import MedalChart from '../chart/medalChart';

class MemberSummary extends Component {
  state = {
    loading: false,
    error: false,
    errorMessage: ''
  };

  render() {
    const panes = [
      {
        menuItem: 'Task & Meeting',
        render: () => (
          <Tab.Pane attached={false}>
            <PercentageChart data={this.props.data} />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Ranking',
        render: () => (
          <Tab.Pane attached={false}>
            <RankingChart data={this.props.data} />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Medal',
        render: () => (
          <Tab.Pane attached={false}>
            <MedalChart data={this.props.data} />
          </Tab.Pane>
        )
      }
    ];

    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.onClose}
        size={'small'}
        closeIcon
      >
        <Dimmer active={this.state.loading}>
          <Loader active={this.state.loading} />
        </Dimmer>
        <Modal.Header>Summary of {this.props.username}</Modal.Header>

        {this.props.data !== '' ? (
          <Modal.Content>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            <SprintStatList data={this.props.data} />
          </Modal.Content>
        ) : (
          <Modal.Content>
            This user have not completed any sprint yet.
          </Modal.Content>
        )}
      </Modal>
    );
  }
}
export default MemberSummary;
