import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome'
import {createMaterialTopTabNavigator , createAppContainer} from 'react-navigation'
import HomeScreen from "./src/screen/Homescreen";
import LoginScreen from "./src/screen/Loginscreen";

const Tab = createMaterialTopTabNavigator({
    home : {
        screen : HomeScreen,
        navigationOptions : {
            title : 'HOME',
            tabBarIcon : ({tintColor}) => <Icon name='home' color={tintColor} size={24} />
        }
    },
    login : {
        screen : LoginScreen,
        navigationOptions : {
            title : "LOGIN",
            tabBarIcon : ({tintColor}) => <Icon name='sign-in' color={tintColor} size={24} />
        }
    }

},{
    tabBarPosition : 'bottom',
    tabBarOptions : {
        showIcon : true,
        activeTintColor : "orange",
        style : {
            backgroundColor : 'grey',
        },
        indicatorStyle : {
            position : 'absolute',
            top : 0,
            height : 5
        }
    }
})

const TabContainer = createAppContainer(Tab)


// class Tab extends Component{
//     render(){
//         return (
//             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//                 <Text>Tab</Text>
//             </View>
//         );
//     }
// }

class LatihanIcon extends Component {
    render() {
        return (
            <TabContainer/>
        );
    }
}
export default LatihanIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});