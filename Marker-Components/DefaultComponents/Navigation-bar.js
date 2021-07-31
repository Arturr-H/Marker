import React from "react";
import { View, StyleSheet } from "react-native";
import D_Button from "./D_Button";
import Colors from "../Variables/Colors";
const Navigation_Bar = (props) => {

    return(
        <View style={styles.nb}>
            <D_Button title="Home"/>
            <D_Button title="My markers" func={props.MyMarkers}/>
            <View style={{marginHorizontal: "6%"}}></View>
            <D_Button title="Options"/>

        </View>
    );
}
const styles = StyleSheet.create({
    nb: {
        zIndex: 1,
        width: "100%",
        height: 100,
        backgroundColor: Colors.SECONDARY_COLOR,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
    }
})

export default Navigation_Bar;