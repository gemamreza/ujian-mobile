import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class EmployeeDetail extends Component {
    render() {
        const {getParam} = this.props.navigation
        return (
            <View style={styles.container}>
                <Text>{getParam('nama')}</Text>
                <Text>{getParam('shift')}</Text>
                <Text>{getParam('phone')}</Text>
            </View>
        );
    }
}
export default EmployeeDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});