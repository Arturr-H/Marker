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
    }, 500);

    function ARRAY_INTERSECTION(a1,a2){// kollar om 2 olika arrays har en eller fler av samma element, (för att jämföra labels)
        return a1.filter(function(n) { return a2.indexOf(n) !== -1;});
    }
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

            // onPress={(e) => { // BARA FÖR DEBUGGING
            //     Variables.MARKERS.push({
            //         name: "namdamndw",
            //         description: "MC_DESCRIPTION",
            //         lat: e.nativeEvent.coordinate.latitude,
            //         lon: e.nativeEvent.coordinate.longitude,
            //     },)
            // }}
            initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 5.0922,
                longitudeDelta: 5.0421,
            }}
            followsUserLocation={FOLLOW_USR_LOC}

            onUserLocationChange={(e) => {
                POS_LATITUDE = e.nativeEvent.coordinate.latitude;
                POS_LONGITUDE = e.nativeEvent.coordinate.longitude;
            }}

        >
            {
                                
                Variables.MARKERS.map((MARKER, INDEX) => {

                    if (Variables.CURRENT_LABEL_FILTERS != "") {
                        if (ARRAY_INTERSECTION(Variables.CURRENT_LABEL_FILTERS, MARKER.labels) != "") {
                            return(
                                <Marker 
                                    Marker={MARKER}
                                    key={INDEX}
                                />
                            );
                        }

                    }else{
                        return(
                            <Marker 
                                Marker={MARKER}
                                key={INDEX}
                            />
                        );
                    }

                })
            }
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
})

export default Map;

export { POS_LONGITUDE, POS_LATITUDE }