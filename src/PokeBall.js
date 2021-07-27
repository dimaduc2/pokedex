import logo from './logo.svg';
import './App.css';
import {Button, Segment, Form, Container, Grid, Image, Popup, Menu} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios';




class PokeBall extends Component {

  state = {
  }
  
  componentDidMount() {
    axios.get('http://localhost:5400/Pokedex/PokeBall')
    
  }
  
  
  render() {
    const { ketQuaPhepTinh } = this.state

    return (
      
      <div className="PokeBall">
dfxdsđfsdf
      </div>

    )
  }






}
export default PokeBall;