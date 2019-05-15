import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import MapView, {Marker} from 'react-native-maps';


class Pemesanan extends Component {
    state = {location : null}

    onBtnClick = () => {
        navigator.geolocation.getCurrentPosition(value => {
            console.log(value)
            this.setState({location : {
                latitude : value.coords.latitude,
                longitude : value.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            }})
        }, err => {
            console.log(err)
        })
    }
    render() {
        const initial = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }
        const obj = this.state.location ? this.state.location : initial
        return (
            <View style={styles.container}>
            <View style={{marginTop: 30, zIndex :1}}>
                <Button title="GET CURRENT LOCATION"
                        onPress={this.onBtnClick} 
                 />
            </View>
            <MapView
              style={styles.map}
              region={
                obj
              }
            >

              <Marker coordinate={obj} />
            </MapView>
          </View>
        );
    }
}
export default Pemesanan;

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex : 1
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });