import logo from './logo.svg';
import './App.css';
import {Button, Segment, Form, Container, Grid, Image, Popup, Label, Icon, Radio, Table, Checkbox, Message} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
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

class All_Pokemon extends Component {
  state = {
    danhSachPokemon:[],
    GridOrTable: 'Table',
    kichThuoc: 'tiny',
    thuTu: 'number',
    coLoi:'',
    ketQuaTimPokemonType2:[],
    dangChonSucManhGi2:'All',
  }
  
  componentDidMount(){
    axios.get('http://localhost:5400/pokemon?thuTu=number&type=all')
    .then(res => {
      if(res.data==='Không kết nối với MongoDB'){
        this.setState({coLoi: res.data});
      }
      else{
        this.setState({danhSachPokemon: res.data});
      }
    })
  }

  onChangeBang = () => {
    if(this.state.GridOrTable === 'Grid'){
      this.setState({ GridOrTable: 'Table'});
    }
    else{
      this.setState({ GridOrTable: 'Grid'});
    }
  }
  
  onChangeKichThuoc = () => {
    if(this.state.kichThuoc === 'big'){
      this.setState({kichThuoc: 'tiny'});
    }
    else{
      this.setState({kichThuoc: 'big'});
    }
  }

  tenPoekon = () => {
    // this.state.danhSachPokemon.sort(function(a, b){
    //   let chu1 = a.name.toLowerCase();
    //   let chu2 = b.name.toLowerCase();
    //   if (chu1 > chu2) {return 1;}
    //   if (chu1 < chu2) {return -1;}
    //   return 0;
    // });
    // this.setState({thuTu:'name'});

    axios.get('http://localhost:5400/pokemon?thuTu=name')
    .then(res => {
      this.setState({danhSachPokemon: res.data});
      this.setState({thuTu:'name'});
    })
  }
  soPoekon = () => {
    // this.state.danhSachPokemon.sort(function(a, b){
    //   return a.number - b.number
    // });
    // this.setState({thuTu:'number'});

    axios.get('http://localhost:5400/pokemon?thuTu=number')
    .then(res => {
      this.setState({danhSachPokemon: res.data});
      this.setState({thuTu:'number'});
    })
  }
  mauPokemon = () => {
    // this.state.danhSachPokemon.sort(function(a, b){
    //   return a.hp - b.hp
    // });
    // this.setState({thuTu:'hp'});
    axios.get('http://localhost:5400/pokemon?thuTu=hp')
    .then(res => {
      this.setState({danhSachPokemon: res.data});
      this.setState({thuTu:'hp'});
    })
  }
  caoPokemon = () => {
    // this.state.danhSachPokemon.sort(function(a, b){
    //   return a.heightM - b.heightM
    // });
    // this.setState({thuTu:'heightM'});

    axios.get('http://localhost:5400/pokemon?thuTu=heightM')
    .then(res => {
      this.setState({danhSachPokemon: res.data});
      this.setState({thuTu:'heightM'});
    })
  }
  canNangPokemon = () => {
    // this.state.danhSachPokemon.sort(function(a, b){
    //   return a.weightKG - b.weightKG
    // });
    // this.setState({thuTu:'weightKG'});

    axios.get('http://localhost:5400/pokemon?thuTu=weightKG')
    .then(res => {
      this.setState({danhSachPokemon: res.data});
      this.setState({thuTu:'weightKG'});
    })
  }


  xoa=(id, index)=>{
    var r = window.confirm("Có xóa không?");
    if(r === true){
      axios.delete('http://localhost:5400/pokemon/'+id)
      .then(res => {
        // this.setState({danhSachPokemon: res.data});
        alert(res.data);
      })
      this.state.danhSachPokemon.splice(index, 1)
      this.forceUpdate()
      // alert('pokemon so '+ index)
    }
  }

  chonType = (e, { name }) => {
    this.setState({ dangChonSucManhGi2: name});
  }

  render() {
    const { GridOrTable, danhSachPokemon, kichThuoc, coLoi, thuTu, ketQuaTimPokemonType2, dangChonSucManhGi2} = this.state
    const { ketQuaTimPokemonType, sucManh} = this.props
    
    return (
      <div className="All_Pokemon">
        <h1>{dangChonSucManhGi2}</h1>
        <h1>{sucManh}</h1>
        <br/><br/>


        
        <br/><br/>

        <Segment compact>Grid <Radio toggle onChange={this.onChangeBang} /> Table</Segment>
        <Segment compact>Tiny <Checkbox slider onChange={this.onChangeKichThuoc} /> Large</Segment>
        <Button color={thuTu==='name' ?'blue' :''} onClick={this.tenPoekon}>Name</Button>
        <Button color={thuTu==='number' ?'blue' :''} onClick={this.soPoekon}>Number</Button>
        <Button color={thuTu==='hp' ?'blue' :''} onClick={this.mauPokemon}>Hp</Button>
        <Button color={thuTu==='heightM' ?'blue' :''} onClick={this.caoPokemon}>HeightM</Button>
        <Button color={thuTu==='weightKG' ?'blue' :''} onClick={this.canNangPokemon}>WeightKg</Button>
        <br/>
        <Button name={this.state.dangChonSucManhGi2 = 'Normal'} onClick={this.chonType}>Normal</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Fire'} onClick={this.chonType}>Fire</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Water'} onClick={this.chonType}>Water</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Electric'} onClick={this.chonType}>Electric</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Grass'} onClick={this.chonType}>Grass</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Ice'} onClick={this.chonType}>Ice</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Fighting'} onClick={this.chonType}>Fighting</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Poison'} onClick={this.chonType}>Poison</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Ground'} onClick={this.chonType}>Ground</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Fling'} onClick={this.chonType}>Fling</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Psychic'} onClick={this.chonType}>Psychic</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Bug'} onClick={this.chonType}>Bug</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Rock'} onClick={this.chonType}>Rock</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Ghost'} onClick={this.chonType}>Ghost</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Dragon'}  onClick={this.chonType}>Dragon</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Dark'}  onClick={this.chonType}>Dark</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Steel'}  onClick={this.chonType}>Steel</Button>
        <Button name={this.state.dangChonSucManhGi2 = 'Fairy'}  onClick={this.chonType}>Fairy</Button>
        <br/><br/>

        {coLoi
          ?
          <Message compact error>
            {coLoi}
          </Message>
          :null
        }

        {sucManh === 'All'
          ?
          <div>
            {GridOrTable=== 'Table'
              ?
              <Container align='center'>
                <Segment compact raised>
                  {danhSachPokemon
                    ?
                    <Grid doubling columns='5'>
                        {danhSachPokemon.map((moiPokemon, index)=>
                          <Grid.Column>
                            <Popup on='click' trigger={
                              <div>
                                <Image src={this.props.anhPokemon[moiPokemon.image]} size={kichThuoc} style={{background:'white'}}></Image>
                                <br/>
                                <i>{moiPokemon.number}</i>
                                <br/>
                                <b>{moiPokemon.name}</b>
                              </div>
                            } wide='very' >
                              <Grid>
                                <Grid.Column textAlign='center' width={8}>
                                  <Image src={this.props.anhPokemon[moiPokemon.image]} size='big' style={{background:'white'}}></Image>
                                </Grid.Column>
                                <Grid.Column textAlign='center' width={8}>
                                  <b>Number: {moiPokemon.number}</b>
                                  <br/>
                                  <b>Name: {moiPokemon.name}</b>
                                  <br/>
                                  <b>Type: 
                                    {moiPokemon.type.map((moiType, index)=>
                                      types[moiType]  
                                      ? <Label 
                                          style={{color:'white', background:types[moiType].mau}}  
                                          ><Icon name={types[moiType].kiHieu} />{moiType}
                                        </Label>
                                      : <div>Lỗi không tìm thấy {moiType} trog từ điền types</div>
                                    )}
                                  </b>
                                  <br/>
                                  <b>HP: {moiPokemon.hp}</b>
                                  <br/>
                                  <b>Attack: {moiPokemon.attack}</b>
                                  <br/>
                                  <b>Defense: {moiPokemon.defense}</b>
                                  <br/>
                                  <b>Sp:atk: {moiPokemon.sp_atk}</b>
                                  <br/>
                                  <b>Sp:def: {moiPokemon.sp_def}</b>
                                  <br/>
                                  <b>Speed: {moiPokemon.speed}</b>
                                  <br/>
                                  <b>Height: {moiPokemon.heightM}m</b>
                                  <br/>
                                  <b>Weight: {moiPokemon.weightKG}kg</b>
                                  <br/>
                                  {moiPokemon.evo_from === ''
                                    ?null
                                    :<b>Evo From: {moiPokemon.evo_from}</b>
                                  }
                                  <br/>
                                  {moiPokemon.evo_to.length > 0
                                    ?<b>Evo To: {moiPokemon.evo_to+'\n'}</b>
                                    :null
                                  }
                                  <br/>
                                  <Button onClick={() => this.xoa(moiPokemon._id, index)}>X</Button>
                                </Grid.Column>
                              </Grid>
                            </Popup>
                            <br/>
                            {moiPokemon.type.map((moiType, index)=>
                              types[moiType]
                                ?<Icon circular style={{color:'white', background:types[moiType].mau}} name={types[moiType].kiHieu} size='large' />
                                :<div>Lỗi không tìm thấy {moiType} trog từ điền types</div>
                            )}
                          </Grid.Column>
                          
                        )}
                      </Grid>
                    :null
                  }

                </Segment>
              </Container>
              :
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Image</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Number</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Hp</Table.HeaderCell>
                    <Table.HeaderCell>Attack</Table.HeaderCell>
                    <Table.HeaderCell>Defense</Table.HeaderCell>
                    <Table.HeaderCell>Sp.Atk</Table.HeaderCell>
                    <Table.HeaderCell>Sp.Def</Table.HeaderCell>
                    <Table.HeaderCell>Speed</Table.HeaderCell>
                    <Table.HeaderCell>Height</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Evo From</Table.HeaderCell>
                    <Table.HeaderCell>Evo To</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {danhSachPokemon.map((moiPokemon, index)=>
                    <Table.Row>
                      <Table.Cell><Image src={this.props.anhPokemon[moiPokemon.image]} size='mini' size='tiny' style={{background:'white'}}></Image></Table.Cell>
                      <Table.Cell>{moiPokemon.name}</Table.Cell>
                      <Table.Cell>{moiPokemon.number}</Table.Cell>
                      <Table.Cell>
                        {moiPokemon.type.map((moiType, index)=>
                          // <Label 
                          //   style={{color:'white', background:types[moiType].mau}}
                          //   ><Icon name={types[moiType].kiHieu} />{moiType}
                          // </Label>
                          types[moiType]
                            ? <Label 
                                style={{color:'white', background:types[moiType].mau}}
                                ><Icon name={types[moiType].kiHieu} />{moiType}
                              </Label>
                            : <div>Lỗi không tìm thấy {moiType} trog từ điền types</div>
                        )}
                      </Table.Cell>
                      <Table.Cell>{moiPokemon.hp}</Table.Cell>
                      <Table.Cell>{moiPokemon.attack}</Table.Cell>
                      <Table.Cell>{moiPokemon.defense}</Table.Cell>
                      <Table.Cell>{moiPokemon.sp_atk}</Table.Cell>
                      <Table.Cell>{moiPokemon.sp_def}</Table.Cell>
                      <Table.Cell>{moiPokemon.speed}</Table.Cell>
                      <Table.Cell>{moiPokemon.heightM}m</Table.Cell>
                      <Table.Cell>{moiPokemon.weightKG}kg</Table.Cell>
                      <Table.Cell>{moiPokemon.evo_from}</Table.Cell>
                      <Table.Cell>{moiPokemon.evo_to+'\n'}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            }
          </div>
          :
          <div>
            {GridOrTable=== 'Table'
              ?
              <Container align='center'>
                <Segment compact raised>
                  {ketQuaTimPokemonType
                    ?
                    <Grid doubling columns='5'>
                        {ketQuaTimPokemonType.map((moiPokemon, index)=>
                          <Grid.Column>
                            <Popup on='click' trigger={
                              <div>
                                <Image src={this.props.anhPokemon[moiPokemon.image]} size={kichThuoc} style={{background:'white'}}></Image>
                                <br/>
                                <i>{moiPokemon.number}</i>
                                <br/>
                                <b>{moiPokemon.name}</b>
                              </div>
                            } wide='very' >
                              <Grid>
                                <Grid.Column textAlign='center' width={8}>
                                  <Image src={this.props.anhPokemon[moiPokemon.image]} size='big' style={{background:'white'}}></Image>
                                </Grid.Column>
                                <Grid.Column textAlign='center' width={8}>
                                  <b>Number: {moiPokemon.number}</b>
                                  <br/>
                                  <b>Name: {moiPokemon.name}</b>
                                  <br/>
                                  <b>Type: 
                                    {moiPokemon.type.map((moiType, index)=>
                                      types[moiType]  
                                      ? <Label 
                                          style={{color:'white', background:types[moiType].mau}}  
                                          ><Icon name={types[moiType].kiHieu} />{moiType}
                                        </Label>
                                      : <div>Lỗi không tìm thấy {moiType} trog từ điền types</div>
                                    )}
                                  </b>
                                  <br/>
                                  <b>HP: {moiPokemon.hp}</b>
                                  <br/>
                                  <b>Attack: {moiPokemon.attack}</b>
                                  <br/>
                                  <b>Defense: {moiPokemon.defense}</b>
                                  <br/>
                                  <b>Sp:atk: {moiPokemon.sp_atk}</b>
                                  <br/>
                                  <b>Sp:def: {moiPokemon.sp_def}</b>
                                  <br/>
                                  <b>Speed: {moiPokemon.speed}</b>
                                  <br/>
                                  <b>Height: {moiPokemon.heightM}m</b>
                                  <br/>
                                  <b>Weight: {moiPokemon.weightKG}kg</b>
                                  <br/>
                                  {moiPokemon.evo_from === ''
                                    ?null
                                    :<b>Evo From: {moiPokemon.evo_from}</b>
                                  }
                                  <br/>
                                  {moiPokemon.evo_to.length > 0
                                    ?<b>Evo To: {moiPokemon.evo_to+'\n'}</b>
                                    :null
                                  }
                                  <br/>
                                  <Button onClick={() => this.xoa(moiPokemon._id, index)}>X</Button>
                                </Grid.Column>
                              </Grid>
                            </Popup>
                            <br/>
                            {moiPokemon.type.map((moiType, index)=>
                              types[moiType]
                                ?<Icon circular style={{color:'white', background:types[moiType].mau}} name={types[moiType].kiHieu} size='large' />
                                :<div>Lỗi không tìm thấy {moiType} trog từ điền types</div>
                            )}
                          </Grid.Column>
                          
                        )}
                      </Grid>
                    :null
                  }

                </Segment>
              </Container>
              :
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Image</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Number</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Hp</Table.HeaderCell>
                    <Table.HeaderCell>Attack</Table.HeaderCell>
                    <Table.HeaderCell>Defense</Table.HeaderCell>
                    <Table.HeaderCell>Sp.Atk</Table.HeaderCell>
                    <Table.HeaderCell>Sp.Def</Table.HeaderCell>
                    <Table.HeaderCell>Speed</Table.HeaderCell>
                    <Table.HeaderCell>Height</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Evo From</Table.HeaderCell>
                    <Table.HeaderCell>Evo To</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {ketQuaTimPokemonType.map((moiPokemon, index)=>
                    <Table.Row>
                      <Table.Cell><Image src={this.props.anhPokemon[moiPokemon.image]} size='mini' size='tiny' style={{background:'white'}}></Image></Table.Cell>
                      <Table.Cell>{moiPokemon.name}</Table.Cell>
                      <Table.Cell>{moiPokemon.number}</Table.Cell>
                      <Table.Cell>
                        {moiPokemon.type.map((moiType, index)=>
                          // <Label 
                          //   style={{color:'white', background:types[moiType].mau}}
                          //   ><Icon name={types[moiType].kiHieu} />{moiType}
                          // </Label>
                          types[moiType]
                            ? <Label 
                                style={{color:'white', background:types[moiType].mau}}
                                ><Icon name={types[moiType].kiHieu} />{moiType}
                              </Label>
                            : <div>Lỗi không tìm thấy {moiType} trog từ điền types</div>
                        )}
                      </Table.Cell>
                      <Table.Cell>{moiPokemon.hp}</Table.Cell>
                      <Table.Cell>{moiPokemon.attack}</Table.Cell>
                      <Table.Cell>{moiPokemon.defense}</Table.Cell>
                      <Table.Cell>{moiPokemon.sp_atk}</Table.Cell>
                      <Table.Cell>{moiPokemon.sp_def}</Table.Cell>
                      <Table.Cell>{moiPokemon.speed}</Table.Cell>
                      <Table.Cell>{moiPokemon.heightM}m</Table.Cell>
                      <Table.Cell>{moiPokemon.weightKG}kg</Table.Cell>
                      <Table.Cell>{moiPokemon.evo_from}</Table.Cell>
                      <Table.Cell>{moiPokemon.evo_to+'\n'}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            }
          </div>
        }

        











        
        <br/>
      </div>

    )
  }









}
export default All_Pokemon;