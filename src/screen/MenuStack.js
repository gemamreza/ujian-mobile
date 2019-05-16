import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import {connect} from 'react-redux';

class Menu extends Component {
    
    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <View>
                    <Text>{this.props.email}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent : 'space-between', marginTop: 100, marginHorizontal: 30}}> 
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('add')} style={{height: 100, width : 100, borderWidth: 3, borderColor : 'lightblue' }}>
                        <Text>Add Employee</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('edit')} style={{height: 100, width : 100, borderWidth: 3, borderColor : 'lightblue' }}>
                        <Text>Edit Employee</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('list')} style={{height: 100, width : 100, borderWidth: 3, borderColor : 'lightblue' }}>
                        <Text>List Employee</Text>
                    </TouchableHighlight>   
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state) => {
    return {
        email : state.auth.email
    }
}

export default connect (mapStateToProps)(Menu);