import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import MapView from 'react-native-maps';
import Colors from '../Variables/Colors';
import Variables from '../Variables/Variables';
import Marker from './Marker';

//▽▽ EXPORTED VARIABLES ▽▽

var POS_LATITUDE;
var POS_LONGITUDE;

//△△ EXPORTED VARIABLES △△

function Map(props) {

    const[FOLLOW_USR_LOC, SET_FOLLOW_USR_LOC] = useState(true);
    setTimeout(() => {//FÖLJ USER LOCATIONEN FÖRSTA SEKUNDEN SÅ NÄR MAN GÅR IN PÅ APPEN SÅ BÖRJAN MAN DÄR MAN ÄR PÅ KARTAN
        SET_FOLLOW_USR_LOC(false)
    }, 100);

    return(
        <MapView

            // mapType="hybrid" kanske ska vara en inställning...
            
            showsCompass={false}
            showsPointsOfInterest={false}
            showsBuildings={true}
            showsTraffic={false}
            userInterfaceStyle={props.UI}
            showsUserLocation={true}

            style={
                styles.map
            }

            onPress={(e) => { // BARA FÖR DEBUGGING
                Variables.MARKERS.push({
                    name: "namdamndw",
                    description: "MC_DESCRIPTION",
                    lat: e.nativeEvent.coordinate.latitude,
                    lon: e.nativeEvent.coordinate.longitude,
                },)
            }}
            initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            followsUserLocation={FOLLOW_USR_LOC}

            onUserLocationChange={(e) => {
                POS_LATITUDE = e.nativeEvent.coordinate.latitude;
                POS_LONGITUDE = e.nativeEvent.coordinate.longitude;
            }}

        >
            {
                                        
                Variables.MARKERS.map((MARKER, INDEX) => {

                    return(
                        <Marker 
                            Marker={MARKER}
                            key={INDEX}
                        />
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
        padding: 4,

        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,

        backgroundColor: Colors.SELECTED,
        bottom: 15,

    },
    INNER_MARKER: {
        padding: 10,

        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,

        backgroundColor: "yellow",
        transform: [{ rotate: "90deg" }],

    },

})

export default Map;

export { POS_LONGITUDE, POS_LATITUDE }