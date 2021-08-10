import logo from './logo.svg';
import './App.css';
import {Menu, Dropdown, Radio, Button, Label, Icon} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link, Car} from 'react-router-dom'
import React, { Component } from 'react'

import './App.css';
import Home from './Home'
import All_Pokemon from './All_Pokemon'
import PokeBall from './PokeBall'
import Admin from './Admin'
import axios from 'axios';

const types = {
  'Normal'    : {'mau': '#E6E6E6', 'kiHieu':'star'},
  'Fire'      : {'mau': '#FF4000', 'kiHieu':'fire'},
  'Water'     : {'mau': '#2E9AFE', 'kiHieu':'theme'},
  'Electric'  : {'mau': '#F7FE2E', 'kiHieu':'bolt'},
  'Grass'     : {'mau': '#01DF01', 'kiHieu':'leaf'},
  'Ice'       : {'mau': '#58FAF4', 'kiHieu':'snowflake outline'},
  'Fighting'  : {'mau': '#610B0B', 'kiHieu':'hand rock'},
  'Poison'    : {'mau': '#610B5E', 'kiHieu':'lab'},
  'Ground'    : {'mau': '#B18904', 'kiHieu':'blackberry'},
  'Flying'    : {'mau': '#819FF7', 'kiHieu':'studiovinari'},
  'Psychic'   : {'mau': '#FE2E64', 'kiHieu':'eye'},
  'Bug'       : {'mau': '#82FA58', 'kiHieu':'bug'},
  'Rock'      : {'mau': '#886A08', 'kiHieu':'slack hash'},
  'Ghost'     : {'mau': '#29088A', 'kiHieu':'snapchat ghost'},
  'Dragon'    : {'mau': '#3A01DF', 'kiHieu':'d and d'},
  'Dark'      : {'mau': '#3B240B', 'kiHieu':'moon'},
  'Steel'     : {'mau': '#A4A4A4', 'kiHieu':'cube'},
  'Fairy'     : {'mau': '#F7819F', 'kiHieu':'like'},
}

const sucManhPokemon = [
  'Normal', 
  'Fire', 
  'Water', 
  'Electric', 
  'Grass', 
  'Ice', 
  'Fighting', 
  'Poison', 
  'Ground', 
  'Flying', 
  'Psychic', 
  'Bug', 
  'Rock', 
  'Ghost', 
  'Dragon', 
  'Dark', 
  'Steel', 
  'Fairy', 
]

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {images[item.replace('./', '')] = r(item).default; });
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
    dangChonSucManhGi:'All',
    timTatCaRaTen:[],
    ketQuaTimPokemonType:[],
    mauSangToi: 'mauToi',
  }

  chonMenu = (e, { name }) => {
    this.setState({dangChonGi: name});
    this.setState({dangChonSucManhGi:'All'});
  }
  chonType = (e, { name }) => {
    this.setState({ dangChonSucManhGi: name});
    axios.get('http://localhost:5400/pokemon?type='+name)
    .then(res => {
      this.setState({ketQuaTimPokemonType: res.data});
    })
  }



  doiSangToi = () => {
    if(this.state.mauSangToi === 'mauToi'){
      this.setState({ mauSangToi: 'mauSang'});
    }
    else{
      this.setState({ mauSangToi: 'mauToi'});
    }
  }


  render() {
    const { dangChonGi, danhSachPokemon, dangChonSucManhGi, ketQuaTimPokemonType, mauSangToi} = this.state
    return (
      <Router>
        <div className="App" style={{backgroundColor: mauSangToi === 'mauToi' ?'#808080' :'white', color: mauSangToi === 'mauToi' ?'#ffbf00' :'black'}}>
          <Menu>
            <Menu.Item
              as={Link}
              to="/"
              name='Home'
              active={this.state.dangChonGi === 'Home'}
              onClick={this.chonMenu}>
            </Menu.Item>

            <Dropdown item text='Pokemon'>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to="/All_Pokemon"
                  name='All_Pokemon'
                  active={this.state.dangChonGi === 'All_Pokemon'}
                  onClick={this.chonMenu}>
                  All Pokemon
                </Dropdown.Item>
                
                <Dropdown item text='Type'>
                  <Dropdown.Menu>
                    {sucManhPokemon.map((moiSucManh, index)=>
                      <Dropdown.Item
                        as={Link}
                        // to="/"
                        name={moiSucManh}
                        active={this.state.dangChonSucManhGi === moiSucManh}
                        onClick={this.chonType}>
                        {moiSucManh}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

              </Dropdown.Menu>
            </Dropdown>

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
              to="/PokeBall"
              name='PokeBall'
              active={this.state.dangChonGi === 'PokeBall'}
              onClick={this.chonMenu}>
            </Menu.Item>

            <Menu.Item>
              <Icon name='moon' /><Radio toggle onChange={this.doiSangToi} /><Icon name='sun' />
            </Menu.Item>

          </Menu>

          <Route exact path = "/"  component = {Home} />
          <Route path = "/All_Pokemon" render={() => <All_Pokemon anhPokemon={anhPokemon} sucManh={dangChonSucManhGi} ketQuaTimPokemonType={ketQuaTimPokemonType} />} />
          <Route path = "/Admin" render={() => <Admin lamGi={dangChonGi} anhPokemon={anhPokemon} />} />
          <Route path = "/PokeBall" render={() => <PokeBall anhPokemon={anhPokemon} />} />

        </div>
      </Router>

    );

  }
}

export default App;
