import logo from './logo.svg';
import './App.css';
import {Button, Segment, Form, Container, Grid, Image, Popup, Menu} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios';




class PokeBall extends Component {

  state = {
    danhSachPokeBall:'',
    coLoi:'',
    
  }
  
  
  componentDidMount(){
    axios.get('http://localhost:5400/pokeball?nameBall=all')

    .then(res => {
      if(res.data==='Không kết nối với MongoDB'){
        this.setState({coLoi: res.data});
      }
      else{
        this.setState({danhSachPokeBall: res.data});
      }
    })
  }

  

  render() {
    const { ketQuaPhepTinh, danhSachPokeBall } = this.state

    return (
      
      <div className="PokeBall">
        

        {danhSachPokeBall.length}


      </div>

    )
  }






}
export default PokeBall;