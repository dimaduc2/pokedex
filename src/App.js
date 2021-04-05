import logo from './logo.svg';
import './App.css';
import {Button, Segment, Form, Container, Grid, Image, Popup} from 'semantic-ui-react'
import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {

  state = {
    so1:'', 
    so2:'', 
    ketQuaPhepTinh:'',

    soArrayCuaTen:'',
    timRaTen:'',
    timTatCaRaTen:[],

    tenAdd:'',

  }

  onChangeThemTenMoi = (e, { value }) => {
    this.setState({tenAdd: value})
  }
  themTenMoi = (e, { value }) => {
    axios.get('http://localhost:5400/Pokedex/themTen?tenMoi='+this.state.tenAdd)    
    .then(res => {
      this.setState({timTatCaRaTen: res.data.ketQuaTatCaTenArray});
    })
  }


  onChangeTimTenArray = (e, { value }) => {
    this.setState({tenArray: value})
  }
  timTenArray = () => {
    axios.get('http://localhost:5400/Pokedex/timTen?soArrayCuaTen='+(this.state.tenArray-1))
    .then(res => {
      // alert(res.data.ketQuaTenArray)
      this.setState({timRaTen: res.data.ketQuaTenArray});
      this.setState({tenArray:''});
    })
  }
  timTatCaTenArray = () => {
    axios.get('http://localhost:5400/Pokedex/timTatCaTen?soArrayCuaTen='+this.state.tenArray)
    .then(res => {
      this.setState({timTatCaRaTen: res.data.ketQuaTatCaTenArray});
    })
  }


  onChangeTimSo1 = (e, { value }) => {
    this.setState({so1: value})
  }
  onChangeTimSo2 = (e, { value }) => {
    this.setState({so2: value})
  }
  tinhTong = () => {
    axios.get('http://localhost:5400/Pokedex/cong?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      // alert(res.data.ketQua)
      this.setState({ketQuaPhepTinh: res.data.ketQua});
      this.setState({so1:''});
      this.setState({so2:''});
    })
    .catch(err => {
      // alert(err)
      console.log(err)
    })
  }
  tinhHieu = () => {
    axios.get('http://localhost:5400/Pokedex/tru?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      // alert(res.data.ketQua)
      this.setState({ketQuaPhepTinh: res.data.ketQua});
      this.setState({so1:''});
      this.setState({so2:''});
    })
    .catch(err => {
      // alert(err)
      console.log(err)
    })
  }
  tinhtich = () => {
    axios.get('http://localhost:5400/Pokedex/nhan?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      // alert(res.data.ketQua)
      this.setState({ketQuaPhepTinh: res.data.ketQua});
      this.setState({so1:''});
      this.setState({so2:''});
    })
    .catch(err => {
      // alert(err)
      console.log(err)
    })
  }
  tinhThuong = () => {
    axios.get('http://localhost:5400/Pokedex/chia?so1='+this.state.so1+'&so2='+this.state.so2)
    .then(res => {
      // alert(res.data.ketQua)
      this.setState({ketQuaPhepTinh: res.data.ketQua});
      this.setState({so1:''});
      this.setState({so2:''});
    })
    .catch(err => {
      // alert(err)
      console.log(err)
    })
  }
  
  render() {
    const { ketQuaPhepTinh, timRaTen, timTatCaRaTen } = this.state
  

    return (
      <div className="App">

        <br/><br/><br/><br/><br/>
              
        so 1 
        <Form>
          <Form.Input inline
          value={this.state.so1}
          onChange={this.onChangeTimSo1}
          />
        </Form>
        so 2 
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
        <br/><br/>
        {ketQuaPhepTinh}

        <br/><br/><br/>

        {/* Tên trong Array [Pichu, Pikachu, Raichu] */}
        <br/><br/>
        <Form>
          <Form.Input inline
          value={this.state.tenArray}
          onChange={this.onChangeTimTenArray}
          />
        </Form>

        <br/>

        <Button onClick={this.timTenArray}>Tìm</Button>
        <br/><br/>
        <Button onClick={this.timTatCaTenArray}>Tìm tất cả</Button>
        <br/><br/>
        {timRaTen}
        <Container align='center'>
        <Segment compact raised>

          {timTatCaRaTen}
        {/* {timTatCaRaTen.map((moiTen, index)=>
            <div>
              {index+1}.{moiTen}
            </div>
          )} */}



    {/* {timTatCaRaTen
      ?
        <div>
          {timTatCaRaTen.map((moiTen)=>
            <div>
                <Grid.Column>
                  <Popup
                    content={
                      <div>
                        <Image src={moiTen.image} size='big'></Image>
                        Name: {moiTen.name}
                      </div>
                    }
                    on='click'
                    pinned
                    trigger={<Image src={moiTen.image} size='small'></Image>}
                    position='center'
                  />
                  <br/>
                  {moiTen.name}
                </Grid.Column>
            </div>
          )}
        </div>
      :null
    } */}


        </Segment>
        </Container>

        <br/><br/><br/>

        <Form>
          <Form.Input inline
          value={this.state.tenArrayAdd}
          onChange={this.onChangeThemTenMoi}
          />
        </Form>
        <br/>
        <Button onClick={this.themTenMoi}>Add</Button>



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
