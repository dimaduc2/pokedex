import logo from './logo.svg';
import './App.css';
import {Button, Input, Form} from 'semantic-ui-react'
import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {

  state = {
    so1:'', 
    so2:'', 
    ketQuaPhepTinh:'',

    // tong2so:'', 
    // hieu2so:'', 
    // tich2so:'', 
    // thuong2so:'', 

  }

  onChangeTimSo1 = (e, { value }) => {
    this.setState({so1: value})
  }
  onChangeTimSo2 = (e, { value }) => {
    this.setState({so2: value})
  }
  
  tinhTong = (e, { value }) => {
    axios.get('http://localhost:5400/Pokedex/cong?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      this.setState({ketQuaPhepTinh: res.data});
      this.setState({so1:''});
      this.setState({so2:''});
      
    })
  }
  
  tinhHieu = (e, { value }) => {
    axios.get('http://localhost:5400/Pokedex/tru?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      this.setState({ketQuaPhepTinh: res.data});
      this.setState({so1:''});
      this.setState({so2:''});
    })
  }
  
  tinhtich = (e, { value }) => {
    axios.get('http://localhost:5400/Pokedex/nhan?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      this.setState({ketQuaPhepTinh: res.data});
      this.setState({so1:''});
      this.setState({so2:''});
    })
  }
  
  tinhThuong = (e, { value }) => {
    axios.get('http://localhost:5400/Pokedex/chia?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      this.setState({ketQuaPhepTinh: res.data});
      this.setState({so1:''});
      this.setState({so2:''});
    })
  }
  
  render() {
    const { ketQuaPhepTinh } = this.state
  

    return (
      <div className="App">

        <br/><br/><br/><br/><br/>
              
        name 1 
        <Form>
          <Form.Input inline
          value={this.state.so1}
          onChange={this.onChangeTimSo1}
          />
        </Form>
        name 2 
        <Form>
          <Form.Input inline
          value={this.state.so2}
          onChange={this.onChangeTimSo2}
          />
        </Form>

        <br/>

        <Button onClick={this.tinhTong}>+</Button>
        <Button onClick={this.tinhHieu}>-</Button>
        <Button onClick={this.tinhtich}>*</Button>
        <Button onClick={this.tinhThuong}>/</Button>
        
        <br/>
        
        {ketQuaPhepTinh}

        <br/><br/><br/><br/>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }




}

export default App;
