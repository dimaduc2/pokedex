import logo from './logo.svg';
import './App.css';
import {Button, Segment, Form, Container, Grid, Image, Popup, Menu} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios';




class PokeBall extends Component {

  state = {
    danhSachPokeBall:[],
    coLoi:'',
    kichThuoc: 'tiny',
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

  
  xoaDanhSachPokeBall = (id, index) => {
    var r = window.confirm("Có xóa không?");
    if(r === true){
      axios.delete('http://localhost:5400/pokeball/'+id)
      .then(res => {
        alert(res.data)
      })
    }
  }
  themDanhSachPokeBall = (e, { value }) => {
    var pokeBallMoi = {
                      name: this.state.Name,
                    }
    axios.post('http://localhost:5400/pokeball', pokeBallMoi)
    .then(res => {
      alert(res.data)
    })
  }
  suaDanhSachPokeBall = (id, index) => {
    var pokeBallSua = {
                      name: this.state.Name,
                    }
    axios.put('http://localhost:5400/pokeball/'+this.state.Id, pokeBallSua)
    .then(res => {
      alert(res.data)
    })
  }


  render() {
    const { danhSachPokeBall, kichThuoc } = this.state

    return (
      
      <div className="PokeBall">
        

        {danhSachPokeBall.length}

        {danhSachPokeBall
          ?
          <Grid doubling columns='5'>
              {danhSachPokeBall.map((moiPokeBall, index)=>
                <Grid.Column>
                  <Popup on='click' trigger={
                    <div>
                      <Image src={moiPokeBall.image} size={kichThuoc} ></Image>
                      <br/>
                      <b>{moiPokeBall.name}</b>
                    </div>
                  } wide='very' >
                    <Grid>
                      <Grid.Column textAlign='center' width={8}>
                        <Image src={moiPokeBall.image} size='big' ></Image>
                      </Grid.Column>
                      <Grid.Column textAlign='center' width={8}>
                        <b>Name: {moiPokeBall.name}</b>
                      </Grid.Column>
                    </Grid>
                  </Popup>
                </Grid.Column>
              )}
            </Grid>
          :null
        }
          

        <br/>
        <Button onClick={this.xoaDanhSachPokeBall}>xóa danh sach PokeBall</Button>
        <Button onClick={this.themDanhSachPokeBall}>thêm danh sach PokeBall</Button>
        <Button onClick={this.suaDanhSachPokeBall}>sửa danh sach PokeBall</Button>
        <br/>


      </div>

    )
  }






}
export default PokeBall;