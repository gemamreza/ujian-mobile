import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'


class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.openDrawer}>
                    <Icon style={{marginLeft : 5 }} onPress={() => this.props.navigation.openDrawer()} name='bars' size={26} color='black' />
                </View>
            </View>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    openDrawer : {
        borderBottomWidth : 3,
        height : 60,
        justifyContent : 'center'
    }
});