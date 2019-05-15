import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right, Text, Button, Body, Title, View} from 'native-base';
import {Fire} from './../support/firebase'
import {connect} from 'react-redux';

class AddEmployee extends Component {

    state = {selected : '', data : [], textNama : '', textPhone : ''}
    componentDidMount(){
      Fire.database().ref('manager').on('value', items => {
        this.setState({data : items.val()})
      })
    }

    addBtn = () => {
      var db = Fire.database()
      var employee = db.ref('manager/' + this.props.user.id + '/employee')

      employee.push({
        nama : this.state.textNama,
        phone : this.state.textPhone,
        shift : this.state.selected
      })
      .then((res) => {
        this.setState({textNama : '', textPhone : ''})
        alert('Input Data Berhasil')
      })
      .catch((err) => {
        console.log(err)
      })
    }

  render() {
      
    return (
      <Container>
        <Header>
            <Body>
                <Title style={{marginLeft: 15}}>ADD EMPLOYEE PAGE</Title>
            </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nama</Label>
              <Input onChangeText={(text) => this.setState({textNama : text})} value={this.state.textNama}/>
            </Item>
            <Item floatingLabel last>
              <Label>Phone</Label>
              <Input onChangeText={(text) => this.setState({textPhone : text})} value={this.state.textPhone}/>
            </Item>
          <Item>
              <Left>
                <Label>Select Shift</Label>
              </Left>
              <Right>
                <Picker
                mode="dropdown"
                style={{width : 120}}
                selectedValue = {this.state.selected}
                onValueChange = {(value) => this.setState({selected : value})}
                >
                    <Picker.Item label='Monday' value='Monday' />
                    <Picker.Item label='Tuesday' value='Tuesday' />
                    <Picker.Item label='Wednesday' value='Wednesday' />
                    <Picker.Item label='Thursday' value='Thursday' />
                    <Picker.Item label='Friday' value='Friday' />
                </Picker>
              </Right>
          </Item>

          <Button block rounded success style={{marginTop : 20, marginHorizontal : 15}} onPress={this.addBtn}>
                <Text>ADD EMPLOYEE</Text>
          </Button>
            <View>
              {
                Object.keys(this.state.data).map((val) => {
                  return(
                    <View>
                    <Text>
                      {this.state.data[val].manager}
                    </Text>
                    </View>
                  )
                })
              }
            </View>
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

export default connect (mapStateToProps)(AddEmployee)