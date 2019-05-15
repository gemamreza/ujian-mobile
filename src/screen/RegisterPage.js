import React, { Component } from 'react';
import {View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Title, Body, Icon} from 'native-base';
import {ActivityIndicator} from 'react-native';
import {Fire} from './../support/firebase';
import {onLoginSuccess} from './../2.actions';
import {StackActions, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

class Register extends Component {
  state = {pass : '', confirm : '', loading : false, error : ''}

  componentDidUpdate(){
    // did update butuh pengkondisian
    if(this.props.user.email){
      const resetAction = StackActions.reset({
        index : 0,
        actions : [NavigationActions.navigate({routeName : 'home'})]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  onBtnRegisterClick = () => {
    if(this.inputEmail && this.state.pass && this.state.confirm){
      if(this.state.pass == this.state.confirm){
        this.setState({loading : true})
        const auth = Fire.auth()
        auth.createUserWithEmailAndPassword(this.inputEmail, this.state.pass)
        .then((val) => {
          var {uid, email} = val.user
          console.log(uid)
          this.props.onLoginSuccess(email, uid)
        })
        .catch((err) => {
          this.setState({error : err.message, loading : false})
        })
      } else {
         this.setState({error : 'Pastikan password match'})
      }
   
    } else {
      this.setState({error : 'Tidak Boleh ada Yang Kosong'})
    }
  }

  render() {
    const confirm = this.state.confirm == "" ?
    <Item floatingLabel last>
      <Label>Confirm Password</Label>
      <Input onChangeText = {(val) => this.setState({confirm : val})} />
    </Item> :
    this.state.confirm == this.state.pass ?
    <Item floatingLabel last success>
      <Label>Confirm Password</Label>
      <Input onChangeText = {(val) => this.setState({confirm : val})} />
      <Icon name='checkmark-circle' />
    </Item> :
    <Item floatingLabel last error>
      <Label>Confirm Password</Label>
      <Input onChangeText = {(val) => this.setState({confirm : val})} />
      <Icon name='close-circle' />
    </Item> 
    return (
      <Container>
        <Header>
            <Body>
                <Title style={{marginLeft: 15}}>REGISTER PAGE</Title>
            </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText= {(text) => this.inputEmail = text }/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText = {(val) => this.setState({pass : val})} />
            </Item>
            {confirm}
          </Form>
                <Button block rounded success style={{marginTop : 10}} onPress={this.onBtnRegisterClick}>
                    {
                      this.state.loading ? 
                      <ActivityIndicator size="small" color="#00ff00" /> 
                      :  <Text>Sign Up</Text>
                    }
                </Button>

                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                    <Text onPress={() => this.props.navigation.navigate('login')}>Sudah punya akun? Login</Text>
                </View>
                  {
                       this.state.error ?
                       <View style={{paddingVertical : 15, backgroundColor : 'red', marginHorizontal : 15}}>
                       <View style={{position : 'absolute', top : 3, right : 3}}>
                         <Icon name='close-circle' fontSize={7} color='white' onPress={() => this.setState({error : ''})}/>
                       </View>  
                         <Text style={{color : 'white', alignSelf : 'center'}}>
                         {this.state.error}
                         </Text>
                       </View>
                       : null
                  }
             
        </Content>
      </Container>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    user : state.auth
  }
}

export default connect (mapStatetoProps,{onLoginSuccess})(Register);