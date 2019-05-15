import React, { Component } from 'react';
import {createAppContainer, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, StackNavigator} from 'react-navigation';
import LoginScreen from '../screen/Loginscreen';
import Register from '../screen/RegisterPage';
import Pemesanan from '../screen/PemesananScreen';
import EmployeeDetail from '../screen/EmployeeDetail';
import MenuAccountSetting from '../screen/MenuAccountSetting';
import EditEmployeeScreen from '../screen/EditEmployeeScreen.js';
import ListEmployeeScreen from '../screen/ListEmployeeScreen';
import Menu from '../screen/MenuStack';
import AddEmployeeScreen from '../screen/AddEmployeeScreen';

const AccountSetting = createStackNavigator({
    menu : MenuAccountSetting
})

const StackBeranda = createStackNavigator({
    MenuStack : Menu,
    add : AddEmployeeScreen,
    edit : EditEmployeeScreen,
    list : ListEmployeeScreen,
    detail : EmployeeDetail
},{
    headerMode : 'none'
})

StackBeranda.navigationOptions = ({navigation}) => {
    let tabBarVisible = false

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if(routeName == 'MenuStack') {
        tabBarVisible = true
    }
    return {
        tabBarVisible
    }
} 

const HomeTab = createMaterialTopTabNavigator({
    home : StackBeranda,
    account : AccountSetting
}, {
    tabBarPosition : 'bottom',
    swipeEnabled : false
})

const StackRoot = createStackNavigator({
    login : LoginScreen,
    register : Register,
    home : HomeTab
},{
    headerMode : 'none',
    // initialRouteName : 'home'
})

export const StackContainer = createAppContainer(StackRoot)
