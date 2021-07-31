import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import MapView from 'react-native-maps';
import Colors from '../Variables/Colors';
import Variables from '../Variables/Variables';


const Marker = (props) => {
    const MARKER_ANIMATION_VALUE_X = useRef(new Animated.Value(50)).current;

    const MARKER_ANIMATION_VALUE_Y = useRef(new Animated.Value(-50)).current;

    const Animate = (ANIMATION, END_VALUE) => {
        Animated.timing(ANIMATION, {
            toValue: END_VALUE,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    function ANIMATE_MARKER_PLACEMENT() {
        Animate(MARKER_ANIMATION_VALUE_X, 0);
        Animate(MARKER_ANIMATION_VALUE_Y, 0);
    }
    ANIMATE_MARKER_PLACEMENT()
    return(
        <MapView.Marker
            coordinate={{
                latitude: props.Marker.lat,
                longitude: props.Marker.lon,
            }}
            title={props.Marker.name}
            description={props.Marker.description + ", TAGS: " + props.Marker.labels}
        >
            <Animated.View 
                style={[
                    styles.Marker,
                    { 
                        transform: [
                            { scaleX: 0.8 }, 
                            { rotate: "-45deg" }, 
                            { translateY: MARKER_ANIMATION_VALUE_Y }, 
                            { translateX: MARKER_ANIMATION_VALUE_X }
                        ]
                    }
                ]}
            >
                <View style={styles.INNER_MARKER} />
            </Animated.View>
        </MapView.Marker>
    );
}
const styles = StyleSheet.create({
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
export default Marker;
