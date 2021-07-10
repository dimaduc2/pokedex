import logo from './logo.svg';
import './App.css';
import {Menu, Dropdown, Button, } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link, Car} from 'react-router-dom'
import React, { Component } from 'react'

import './App.css';
import Home from './Home'
import All_Pokemon from './All_Pokemon'
import Bai_Toan from './Bai_Toan'
import Admin from './Admin'

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item).default; });
  return images;
}
const anhPokemon = importAll(require.context('./anh', false, /\.(png|jpe?g|svg)$/));

class App extends Component {

  state = {
    so1:'', 
    so2:'', 
    ketQuaPhepTinh:'',

    soArrayCuaTen:'',
    timRaTen:'',
    timTatCaRaTen:[],
  }

  chonMenu = (e, { name }) => {
    this.setState({ dangChonGi: name});
  }

  render() {
    const { dangChonGi } = this.state
    return (
      <Router >
        
        <Menu>
          <Menu.Item
            as={Link}
            to="/"
            name='Home'
            active={this.state.dangChonGi === 'Home'}
            onClick={this.chonMenu}>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/All_Pokemon"
            name='All_Pokemon'
            active={this.state.dangChonGi === 'All_Pokemon'}
            onClick={this.chonMenu}>
          </Menu.Item>
          
          <Dropdown item text='Admin'>
            <Dropdown.Menu>

              <Dropdown.Item
                as={Link}
                to="/Admin"
                name='Add'
                active={this.state.dangChonGi === 'Admin'}
                onClick={this.chonMenu}>
                Add
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to="/Admin"
                name='Edit'
                active={this.state.dangChonGi === 'Admin'}
                onClick={this.chonMenu}>
                Edit
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item
            as={Link}
            to="/Bai_Toan"
            name='Bai_Toan'
            active={this.state.dangChonGi === 'Bai_Toan'}
            onClick={this.chonMenu}>
          </Menu.Item>
          
        </Menu>

        <Route exact path = "/"  component = {Home} />
        <Route path = "/All_Pokemon" render={() => <All_Pokemon anhPokemon={anhPokemon} />} />
        <Route path = "/Admin" render={() => <Admin lamGi={dangChonGi} anhPokemon={anhPokemon} />} />
        <Route path = "/Bai_Toan" render={() => <Bai_Toan />} />

      </Router>

    );

  }
}

export default App;
