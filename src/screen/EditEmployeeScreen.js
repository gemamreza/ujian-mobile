import React, { Component } from 'react';
import { View } from 'react-native'
import { Text, Container, Header, Content, Form, Item, Input, Label, Button, Picker, Left, Right } from 'native-base';
import { Fire } from '../support/firebase';
import {connect} from 'react-redux';


class EditEmployee extends Component {
    state = {selected : '', data : [], idEdit : null}

    componentDidMount(){
      Fire.database().ref('manager/' + this.props.user.id + '/employee').on('value', items => {
        this.setState({data : items.val()})
      })
    }

    onBtnSave = () =>{
      var name = ''
      var phonee = ''
      var day = ''
      if(this.inputNama == null){
        name = this.state.data[this.state.idEdit].nama
      } else {
        name = this.inputNama
      }

      if(this.inputPhone == null){
        phonee = this.state.data[this.state.idEdit].phone
      } else {
        phonee = this.inputPhone
      }

      if(this.state.selected == ''){
        day = this.state.data[this.state.idEdit].shift
        
      } else {
        day = this.state.selected
      }

      Fire.database().ref('manager/' + this.props.user.id + '/employee/' + this.state.idEdit).set({
        nama : name,
        phone : phonee,
        shift : day
      })
      .then((res) => {
        alert('Berhasil Edit')
      })
      .catch((err) =>console.log(err))
    }
  render() {
    return (
      <Container>
        <Header />
        <Content>
            <View style={{flexDirection : 'row' , justifyContent:'space-between'}}>
                <View style={{paddingTop : 15, paddingLeft : 15}}>
                    <Text>Select Data</Text>
                </View>
                <View>
                    <Picker style={{width : 200}} mode='dropdown' selectedValue={this.state.idEdit}
                      onValueChange={(val) => this.setState({idEdit : val})} >
                        <Picker.Item label='Select Name' value={null} />
                     {
                         Object.keys(this.state.data).map(val => {
                             return(
                                 <Picker.Item label={this.state.data[val].nama} value={val}/>
                             )
                         })
                      }
                    </Picker>
                </View>
            </View>
          <Form>
            <Item stackedLabel>
              <Label>Nama</Label>
              {/* // kalau ada idEdit pakai ini (this.state.data[this.state.idEdit].nama), kalo ga ada pake null! */}
              <Input onChangeText = {(value) => this.inputNama = value} defaultValue={this.state.idEdit !== null ? this.state.data[this.state.idEdit].nama : null}  />
            </Item>
            <Item stackedLabel last>
              <Label>Phone</Label>
              <Input  onChangeText = {(value) => this.inputPhone = value} defaultValue={this.state.idEdit !== null? this.state.data[this.state.idEdit].phone : null}/>
            </Item>
            <Item>
                <Left>
                    <Label>Select Days</Label>
                </Left>
                <Right>
                    <Picker 
                    // untuk mengubah value pake fn onValueChange
                            style={{width:120}} mode="dropdown"
                            selectedValue={(this.state.selected && this.state.idEdit)?
                            this.state.selected : (this.state.idEdit && this.state.selected === '' ?
                            this.state.data[this.state.idEdit].shift : null)}
                            onValueChange={(value) => this.setState({selected : value})}
                            >
                        <Picker.Item label='Monday' value='Mon' />
                        <Picker.Item label='Tuesday' value='Tue' />
                        <Picker.Item label='Wednesday' value='Wed' />
                        <Picker.Item label='Thursday' value='Thu' />
                        <Picker.Item label='Friday' value='Fri' />
                    </Picker>
                </Right>
            </Item>
            <Button style={{marginTop : 20, marginHorizontal : 15}} block onPress={this.onBtnSave}>
                <Text>Save</Text>
            </Button>

          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.auth
  }
}

export default connect (mapStateToProps)(EditEmployee)