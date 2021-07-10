import logo from './logo.svg';
import './App.css';
import {Button, Segment, Form, Container, Grid, Image, Popup, Menu} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios';




class Bai_Toan extends Component {

  state = {
  }
  
  componentDidMount() {
    axios.get('http://localhost:5400/Pokedex/Bai_Toan')
    
  }
  
  
  render() {
    const { ketQuaPhepTinh } = this.state

    return (
      
      <div className="Bai_Toan">
dfxdsđfsdf
      </div>

    )
  }






}
export default Bai_Toan;