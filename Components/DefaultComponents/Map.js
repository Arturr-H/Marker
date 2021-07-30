import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import Variables from '../Variables/Variables';

//▽▽ EXPORTED VARIABLES ▽▽

var POS_LATITUDE;
var POS_LONGITUDE;

//△△ EXPORTED VARIABLES △△

function Map(props) {

    const[CURRENT_POS, SET_CURRENT_POS] = useState();
    
    return(
        <MapView

            // mapType="hybrid" kanske ska vara en inställning...
            
            showsCompass={false}
            showsPointsOfInterest={false}
            showsBuildings={true}
            showsTraffic={false}
            userInterfaceStyle={"dark"}
            showsUserLocation={true}
            style={styles.map}
    
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}

            onUserLocationChange={(e) => {
                POS_LATITUDE = e.nativeEvent.coordinate.latitude;
                POS_LONGITUDE = e.nativeEvent.coordinate.longitude;
            }}

        >
            {
                Variables.MARKERS.map((MARKER, INDEX) => {
                    return(
                        <MapView.Marker 
            
                            key={INDEX}
                            coordinate={{
                                latitude: MARKER.lat,
                                longitude: MARKER.lon,
                            }}
                            title={MARKER.name}
                            description={MARKER.description}
                    
                        >
                            <View style={styles.Marker} />
                        </MapView.Marker>
                    );
                })
            }
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1
    },
    Marker: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: "yellow",
    }
})

export default Map;

export { POS_LONGITUDE, POS_LATITUDE }