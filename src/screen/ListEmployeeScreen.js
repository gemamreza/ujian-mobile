import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Fire} from './../support/firebase'

class ListEmployee extends Component {
  // state = { data : {
  //     1 : {nama : 'Gema', shift : 'Mon', phone : '0812345765'},
  //     2 : {nama : 'Muhammad', shift : 'Tue', phone : '0819995765'},
  //     3 : {nama : 'Reza', shift : 'Wed', phone : '0812347777'},
  //     4 : {nama : 'Loki', shift : 'Thu', phone : '0812348888'}
  // }
  // }

  state = {data : []}

  componentDidMount(){
    Fire.database().ref('manager/users/' + this.props.user.id + '/employee').on('value', items => {
      this.setState({data : items.val()})
    })
  }

  // onBtnDeleteClick = (bebas) => {

  //   Alert.alert('Delete Data','Are You Sure You Want To Delete ' + this.state.data[bebas].nama ,
  //       [
  //           {text : 'Yes',onPress : () => Fire.database().ref('manager/users/' + this.props.user.id + '/employee/' + bebas).remove() },
  //           {text : 'Cancel'}
  //       ])
  // }


  render() {
    console.disableYellowBox = true
    return (
      <Container>
        <Header />
        <Content>
          <List>
            { 
              this.state.data 
            ?
               Object.keys(this.state.data).map(val => {
                // val hanya mendapatkan id
                return(
                    <ListItem onPress={() => this.props.navigation.navigate('detail', {
                      nama : this.state.data[val].nama,
                      shift : this.state.data[val].shift,
                      phone : this.state.data[val].phone,
                      id : val
                    })}>
                    <Left>
                        <Text>{this.state.data[val].nama}</Text>
                    </Left>

                      {/* <Right>
                      <TouchableHighlight onPress={() => this.onBtnDeleteClick(val)}>
                          <Text style={{color:'black'}} >Delete</Text>
                      </TouchableHighlight>
                      </Right> */}
                      
                    <Right>
                        <Icon name='chevron-right' size={24} />
                    </Right>
                </ListItem>
                )
            })
            :
            <Text>Data Kosong</Text>
        }
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps =(state) => {
    return {
      user : state.auth
    }
}
  export default connect (mapStateToProps)(ListEmployee)