import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import {Fire} from './../support/firebase'
import {connect} from 'react-redux';
import {resetUser} from './../2.actions';

class AccountSetting extends Component {
    onLogOut = () => {
        Fire.auth().signOut()
        .then((val) => {
            console.log(val)
            this.props.resetUser()
            this.props.navigation.navigate('login')
        })
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <Button 
                title = 'Log Out'
                onPress={this.onLogOut}>
                </Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default connect (null, {resetUser})(AccountSetting);