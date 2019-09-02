import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

class MenuBar extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted attached color="blue">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          as={NavLink}
          exact
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
            as={NavLink}
            exact
            to="/logout"
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
export default MenuBar;
