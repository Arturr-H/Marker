import React from "react";
import { TouchableHighlight, Text } from "react-native";
import Variables from "../Variables/Variables";
import Colors from "../Variables/Colors";
import Haptic from "../Functions/Haptic";
const D_Button = (props) => {

    return(
        <TouchableHighlight 
            underlayColor={Colors.DARKEST_MAIN_COLOR}
            style={{
                paddingHorizontal: 20,
                paddingVertical: 15,

                backgroundColor: Colors.MAIN_COLOR,
                flexDirection: "row",
                justifyContent: "center",
                bottom: 0,
                marginHorizontal: 5,
                marginVertical: 10,

                borderRadius: Variables.DEFAULT_BORDER_RADIUS,
            }}
            onPress={() => {
                props.func()
                Haptic("medium")
            }}
        >

            <Text style={{
                fontWeight: "300",
            }}>{props.title}</Text>
        </TouchableHighlight>
    );
}

export default D_Button;