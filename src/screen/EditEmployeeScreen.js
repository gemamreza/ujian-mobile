
import React, { Component } from 'react';
import {View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right , Text, Button, Body, Title} from 'native-base';
import { Fire } from '../support/firebase';
import { connect } from 'react-redux';

 class EditEmployee extends Component {
    state ={selected : '',selectedId:null, data : []}

  componentDidMount(){
    this.getData()
  }

  getData=()=>{
    Fire.database().ref('manager/users/'+this.props.id+'/employee').on('value' , items => {
     
     this.setState({data : items.val()})
     console.log(items.val())
 })
  }

  onBtnSave=()=>{
   
     Fire.database().ref('manager/users/'+this.props.id+'/employee/'+this.state.selectedId).set({
        nama : this.inputNama?this.inputNama:this.state.data[this.state.selectedId].nama,
        phone :this.inputTelp?this.inputTelp:this.state.data[this.state.selectedId].phone,
        shift:this.state.selected?this.state.selected:this.state.data[this.state.selectedId].shift
    })
    .then((res)=>{
      this.setState({selected:'', selectedId:null})
        alert('Berhasil Edit Data')
      
    })
    .catch((err)=>{console.log(err)
    alert(err.message)})
   
  }
    
  render() {
      console.disableYellowBox=true
    return (
      <Container>
       <Header>
            <Body>
                <Title>Edit Employee</Title>
            </Body>
        </Header>
        <Content>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{paddingTop:15, paddingLeft:10}}>
                    <Text>Select data</Text>
                </View>
                <View>
                    <Picker mode='dropdown' style={{width:140}} selectedValue={this.state.selectedId} onValueChange={(value)=>this.setState({selectedId:value, selected:''})}>
                    <Picker.Item label='Select Name' value={null}/>

                 {
                     Object.keys(this.state.data).map(val=>{
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
              <Input onChangeText={(value)=>{this.inputNama=value}} defaultValue={this.state.selectedId!==null?this.state.data[this.state.selectedId].nama : null} />
            </Item>
            <Item stackedLabel last>
              <Label>Phone</Label>
              <Input onChangeText={(value)=>{this.inputTelp=value}} defaultValue={this.state.selectedId!==null?this.state.data[this.state.selectedId].phone : null}/>
            </Item>
            <Item>
                <Left>
                    <Label>Select Day</Label>
                </Left>
                <Right>
                    <Picker mode="dropdown" style={{ width:200}} selectedValue={(this.state.selected &&this.state.selectedId) ?this.state.selected : (this.state.selectedId&& this.state.selected==='') ? this.state.data[this.state.selectedId].shift : null}
              onValueChange={(value)=>this.setState({selected:value})}>
                             <Picker.Item label='Monday' value='Monday'/>
                            <Picker.Item label='Tuesday' value='Tuesday'/>
                            <Picker.Item label='Wednesday' value='Wednesday'/>
                            <Picker.Item label='Thursday' value='Thursday'/>
                            <Picker.Item label='Friday' value='Friday'/>

                        </Picker>
                    
                    </Right>
            </Item>
{
  this.state.selectedId ?
  <Button  block style={{ marginTop:20, marginHorizontal:10}} onPress={this.onBtnSave}>
  <Text>Save</Text>
</Button>  
:
<Button disabled block style={{ marginTop:20, marginHorizontal:10}} onPress={this.onBtnSave}>
<Text>Save</Text>
</Button>  

}
         
          </Form>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    id : state.auth.id
  }
}
export default connect(mapStateToProps)(EditEmployee)