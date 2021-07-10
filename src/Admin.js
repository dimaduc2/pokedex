import './App.css';
import {Button, Form, Message, Dropdown, Input} from 'semantic-ui-react'
import React, { Component } from 'react'
import axios from 'axios';

var danhSachPokemon = [
  // {key:'', text:'', value:'', image:''}
]

const Types = [
  { key: 'Normal', text: 'Normal', value: 'Normal' },
  { key: 'Fire', text: 'Fire', value: 'Fire' },
  { key: 'Water', text: 'Water', value: 'Water' },
  { key: 'Electric', text: 'Electric', value: 'Electric' },
  { key: 'Grass', text: 'Grass', value: 'Grass' },
  { key: 'Ice', text: 'Ice', value: 'Ice' },
  { key: 'Fighting', text: 'Fighting', value: 'Fighting' },
  { key: 'Poison', text: 'Poison', value: 'Poison' },
  { key: 'Ground', text: 'Ground', value: 'Ground' },
  { key: 'Flying', text: 'Flying', value: 'Flying' },
  { key: 'Psychic', text: 'Psychic', value: 'Psychic' },
  { key: 'Bug', text: 'Bug', value: 'Bug' },
  { key: 'Rock', text: 'Rock', value: 'Rock' },
  { key: 'Ghost', text: 'Ghost', value: 'Ghost' },
  { key: 'Dragon', text: 'Dragon', value: 'Dragon' },
  { key: 'Dark', text: 'Dark', value: 'Dark' },
  { key: 'Steel', text: 'Steel', value: 'Steel' },
  { key: 'Fairy', text: 'Fairy', value: 'Fairy' },
]

var tatCaPokemon = []

class Admin extends Component {

  state = {
    Name:'',
    Number:'',
    Image:'',
    Type:[],
    Hp:'',
    Attack:'',
    Defense:'',
    Sp_atk:'',
    Sp_def:'',
    Speed:'',
    HeightM:'',
    Weight:'',
    Evo_from:'',
    Evo_to:'',
    thongTinMoi:'',
    coLoi:false,
  }

  onChangeName = (e, { value }) => {
    this.setState({Name: value})
  }
  onChangeNumber = (e, { value }) => {
    this.setState({Number: value})
  }
  onChangeImage = (e, { value }) => {
    this.setState({Image: value})
  }
  onChangeType = (e, { value }) => {
    this.setState({Type: value})
  }
  onChangeHp = (e, { value }) => {
    this.setState({Hp: value})
  }
  onChangeAttack = (e, { value }) => {
    this.setState({Attack: value})
  }
  onChangeDefense = (e, { value }) => {
    this.setState({Defense: value})
  }
  onChangeSp_atk = (e, { value }) => {
    this.setState({Sp_atk: value})
  }
  onChangeSp_def = (e, { value }) => {
    this.setState({Sp_def: value})
  }
  onChangeSpeed = (e, { value }) => {
    this.setState({Speed: value})
  }
  onChangeHeightM = (e, { value }) => {
    this.setState({HeightM: value})
  }
  onChangeWeight = (e, { value }) => {
    // if(isNaN(value)){
    //   alert('trong Weight Không phải là số mà là chữ, viết lại đi')
    // }else{
      this.setState({Weight: value})
    // }
  }
  onChangeEvo_from = (e, { value }) => {
    this.setState({Evo_from: value})
  }
  onChangeEvo_to = (e, { value }) => {
    this.setState({Evo_to: value})
  }


  componentDidMount(){
    axios.get('http://localhost:5400/Pokedex/timTatCaTen?thuTu=number')
    .then(res => {
      if(res.data==='Không kết nối với MongoDB'){
        this.setState({coLoi: res.data});
      }
      else{
        for(var i = 0 ; i<res.data.length; i++){
          // console.log(res.data[i].name)
          // [{ key: res.data[i].name, text: res.data[i].name, value: res.data[i].name }]
          // danhSachPokemon = [
          //   {key: res.data[i].name, text: res.data[i].name, value:  res.data[i].name},
          // ]

          tatCaPokemon = res.data

          danhSachPokemon.push({
                                  key: res.data[i].name, 
                                  text: res.data[i].name, 
                                  value: i, 
                                  image: { avatar: true, src: this.props.anhPokemon[res.data[i].image] },
                              })
        }
        this.forceUpdate()
      }
    })
  }

  chonPokemon = (e, { value }) => {


    
    this.setState({Name: tatCaPokemon[value].name})
    this.setState({Number: tatCaPokemon[value].number})
    this.setState({Image: tatCaPokemon[value].image})
    // this.setState({Type: tatCaPokemon[value].type})
    this.setState({Hp: tatCaPokemon[value].hp})
    this.setState({Attack: tatCaPokemon[value].attack})
    this.setState({Defense: tatCaPokemon[value].defense})
    this.setState({Sp_atk: tatCaPokemon[value].sp_atk})
    this.setState({Sp_def: tatCaPokemon[value].sp_def})
    this.setState({Speed: tatCaPokemon[value].speed})
    this.setState({HeightM: tatCaPokemon[value].heightM})
    this.setState({Weight: tatCaPokemon[value].weightKG})
    this.setState({Evo_from: tatCaPokemon[value].evo_from})
    this.setState({Evo_to: tatCaPokemon[value].evo_to})
    // this.setState({Number: value})
  }
  
  themDanhSach = (e, { value }) => {
    if(isNaN(this.state.Number) || (this.state.Image) || isNaN(this.state.Hp) || isNaN(this.state.Attack) || isNaN(this.state.Defense) || 
      isNaN(this.state.Sp_atk) || isNaN(this.state.Sp_def) || isNaN(this.state.Speed) || isNaN(this.state.HeightM) || isNaN(this.state.Weight)){
      this.setState({coLoi:true})
    }else{
      this.setState({coLoi:false})
      var pokemonMoi = {
                        name: this.state.Name,
                        number: this.state.Number,
                        image: this.state.Image,
                        type: this.state.Type,
                        hp: this.state.Hp,
                        attack: this.state.Attack,
                        defense: this.state.Defense,
                        sp_atk: this.state.Sp_atk,
                        sp_def: this.state.Sp_def,
                        speed: this.state.Speed,
                        heightM: this.state.HeightM,
                        weightKG: this.state.Weight,
                        evo_from: this.state.Evo_from,
                        evo_to: this.state.Evo_to,
                      }
      axios.post('http://localhost:5400/Pokedex/themPokemon', pokemonMoi)
      .then(res => {
        // alert(res.data)
        this.setState({thongTinMoi: res.data})
      })
    }
  }

  suaDanhSach = (e, { value }) => {
    if(isNaN(this.state.Number) || (this.state.Image) || isNaN(this.state.Hp) || isNaN(this.state.Attack) || isNaN(this.state.Defense) || 
      isNaN(this.state.Sp_atk) || isNaN(this.state.Sp_def) || isNaN(this.state.Speed) || isNaN(this.state.HeightM) || isNaN(this.state.Weight)){
      this.setState({coLoi:true})
    }else{
      this.setState({coLoi:false})
      var pokemonMoi = {
                        name: this.state.Name,
                        number: this.state.Number,
                        image: this.state.Image,
                        type: this.state.Type,
                        hp: this.state.Hp,
                        attack: this.state.Attack,
                        defense: this.state.Defense,
                        sp_atk: this.state.Sp_atk,
                        sp_def: this.state.Sp_def,
                        speed: this.state.Speed,
                        heightM: this.state.HeightM,
                        weightKG: this.state.Weight,
                        evo_from: this.state.Evo_from,
                        evo_to: this.state.Evo_to,
                      }
    }
  }

  

  render() {
    const { thongTinMoi, coLoi } = this.state
    return (
      <div className="Admin">

        <h1>{this.props.lamGi === 'Add'
          ?'Tạo Pokemon Mới'
          :'Sửa Pokemon'
        }</h1>
        
        {this.props.lamGi === 'Edit'
          ? <Dropdown 
          placeholder='Chọn Pokemon để xửa' 
          // fluid
          search 
          selection 
          options={danhSachPokemon} 
          onChange={this.chonPokemon}
          />
          : null
        }
        
        <br/><br/><br/>
        Name
        <Form>
          <Form.Input inline
          value={this.state.Name}
          onChange={this.onChangeName}

           />

          <br/>
          Number
          <Form.Field inline>
            <Input 
            value={this.state.Number}
            onChange={this.onChangeNumber}
            />
            {coLoi && isNaN(this.state.Number)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          Image
          <Form.Field inline>
            <Input 
            value={this.state.Image}
            onChange={this.onChangeImage}
            />
            
          </Form.Field>
          
          <br/>
          Type
          <Dropdown 
            placeholder='Skills' 
            fluid 
            multiple 
            search 
            selection 
            options={Types} 
            onChange={this.onChangeType}
           />

          <br/>
          HP
          <Form.Field inline>
            <Input
            value={this.state.Hp}
            onChange={this.onChangeHp}
            />
            {coLoi && isNaN(this.state.Hp)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>
          
          <br/>
          Attack
          <Form.Field inline>
            <Input inline
            value={this.state.Attack}
            onChange={this.onChangeAttack}
            />
            {coLoi && isNaN(this.state.Attack)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          Defense
          <Form.Field inline>
            <Input inline
            value={this.state.Defense}
            onChange={this.onChangeDefense}
            />
            {coLoi && isNaN(this.state.Defense)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          Sp_atk
          <Form.Field inline>
            <Input inline
            value={this.state.Sp_atk}
            onChange={this.onChangeSp_atk}
            />
            {coLoi && isNaN(this.state.Sp_atk)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          Sp_def
          <Form.Field inline>
            <Input inline
            value={this.state.Sp_def}
            onChange={this.onChangeSp_def}
            />
            {coLoi && isNaN(this.state.Sp_def)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          Speed
          <Form.Field inline>
            <Input inline
            value={this.state.Speed}
            onChange={this.onChangeSpeed}
            />
            {coLoi && isNaN(this.state.Speed)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          HeightM
          <Form.Field inline>
            <Input inline
            value={this.state.HeightM}
            onChange={this.onChangeHeightM}
            />
            {coLoi && isNaN(this.state.HeightM)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          Weight
          <Form.Field inline>
            <Input inline
            value={this.state.Weight}
            onChange={this.onChangeWeight}
            />
            {coLoi && isNaN(this.state.Weight)
              ?<b style={{color:'red'}}>Phải viết số</b>
              :null
            }
          </Form.Field>

          <br/>
          Evo_from
          <Form.Input inline
          value={this.state.Evo_from}
          onChange={this.onChangeEvo_from}
          />
          <br/>
          Evo_to
          <Form.Input inline fluid
          value={this.state.Evo_to}
          onChange={this.onChangeEvo_to}
          />
        </Form>
        
        <br/>

        {this.props.lamGi === 'Add'
          ?<Button onClick={this.themDanhSach}>Thêm thông tin Pokemon</Button>
          :<Button onClick={this.suaDanhSach}>Sửa thông tin Pokemon</Button>
        }
        
        
        <br/><br/>
        
        
        {!thongTinMoi
          ? null
          : thongTinMoi==='err DB'
            ? <Message compact error>
                {'Không thể kết nối BD'}
              </Message>
            : <Message compact positive>
                {'Đã thêm Pokemon mới là: '+thongTinMoi}
              </Message>
        }
        {coLoi
          ? <Message compact error>
              {'Không thêm được, phải viết số'}
            </Message>
          : null
        }




        {/* <Message compact positive>
          {thongTinMoi}
        </Message> */}


        {/* positive
        error */}
        



        <br/><br/>
      </div>
    )
  }

}
export default Admin;