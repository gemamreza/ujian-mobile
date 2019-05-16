import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TouchableOpacity
} from "react-native";
import {Fire} from './../support/firebase';
import {connect} from 'react-redux';
import Communications from 'react-native-communications';

class EmployeeDetail extends Component {

    delete = (id) => {
        
        Fire.database().ref('manager/users/'+this.props.user.id+'/employee').child(id).remove()
        .then((res)=>{
            alert('Data berhasil dihapus')
            this.props.navigation.navigate('list')
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    deleteEmployee=(id,nama)=>{
        Alert.alert('delete data', 'Are You Sure You Want to  delete '+nama+'?', 
        [{text : 'Yes', onPress :()=> this.delete(id)}, {text : 'Cancel'}]);
    }

    render() {
        const {getParam} = this.props.navigation
        return (
            <View style={styles.container}>
                <Text>{getParam('nama')}</Text>
                <Text>{getParam('shift')}</Text>
                <Text>{getParam('phone')}</Text>
                <Button title='DELETE EMPLOYEE' onPress={()=>this.deleteEmployee(getParam('id'), getParam('nama'))} />
                <TouchableOpacity 
                    style = {styles.holder}
                    onPress={() => Communications.text(getParam('phone'), `Hello ${getParam('nama')} your upcoming shift is on ${getParam('shift')}` )}>
                        <Text style={styles.text}>
                        Send a Text
                        </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 32,
    },
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        user : state.auth
    }
}

export default connect(mapStateToProps)(EmployeeDetail);