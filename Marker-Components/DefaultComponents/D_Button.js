import React from "react";
import { TouchableHighlight, Text } from "react-native";
import Variables from "../Variables/Variables";
import Colors from "../Variables/Colors";
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
            onPress={() => props.func}
        >

            <Text>{props.title}</Text>
        </TouchableHighlight>
    );
}

export default D_Button;