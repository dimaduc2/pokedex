import logo from './logo.svg';
import './App.css';
import {Button, Segment, Form, Container, Grid, Image, Popup, Menu, Card, Input} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios';




class PokeBall extends Component {

  state = {
    danhSachPokeBall:[],
    coLoi:false,
    kichThuoc: 'tiny',
    Name:'',
    Image:'',
    Id:'',
  }
  
  
  componentDidMount(){
    axios.get('http://localhost:5400/pokeball')

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
        // this.setState({danhSachPokemon: res.data});
        // alert(res.data)
      })
    }
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


  onChangeName = (e, { value }) => {
    this.setState({Name: value})
  }
  onChangeImage = (e, { value }) => {
    this.setState({Image: value})
  }
  themDanhSach = (e, { value }) => {
    // if((this.state.Image)){
    //   this.setState({coLoi:true})
    // }else{


      this.setState({coLoi:false})
      var pokeBallMoi = {
                        name: this.state.Name,
                        image: this.state.Image,
                        // id: this.state.Id,
                      }
      axios.post('http://localhost:5400/pokeball', pokeBallMoi)
      .then(res => {
        alert(res.data)
        this.setState({Name: ''})
        this.setState({Image: ''})
      })


    // }
  }


  render() {
    const { danhSachPokeBall, kichThuoc } = this.state

    return (
      
      <div className="PokeBall">
        

        {danhSachPokeBall.length}

        {/* {danhSachPokeBall
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
                  } wide='very'>
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
        } */}
          

        {danhSachPokeBall
          ?

          <Card.Group itemsPerRow={5}>
            {danhSachPokeBall.map((moiPokeBall, index)=>
              <Card>
                <Popup on='click' trigger={
                  <div>
                    <Image src={moiPokeBall.image}></Image>
                    <br/>
                    <b>{moiPokeBall.name}</b>
                  </div>
                } wide='very'>
                  <Card>
                      <Image src={moiPokeBall.image} size='big' ></Image>
                      <b>Name: {moiPokeBall.name}</b>
                      <br/> 
                      <Button onClick={() => this.xoaDanhSachPokeBall(moiPokeBall._id, index)}>X</Button>
                  </Card>
                </Popup>
              </Card>
            )}
          </Card.Group>

          :null
        }
          

        <br/>
        <Button onClick={this.suaDanhSachPokeBall}>sửa danh sach PokeBall</Button>
        <br/><br/><br/><br/>


        name
        <Form.Field inline>
          <Input 
          value={this.state.Name}
          onChange={this.onChangeName}
          />

          <br/>
          Image
          <Form.Field inline>
            <Input 
            value={this.state.Image}
            onChange={this.onChangeImage}
            />
          </Form.Field>

        </Form.Field>
        
        <br/>

        <Button onClick={this.themDanhSach}>Thêm thông tin Poke Ball</Button>
        





        <br/><br/>

      </div>

    )
  }






}
export default PokeBall;