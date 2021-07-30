import React, { useState } from "react";
import { TouchableHighlight, Text } from "react-native";
import Colors from "../Variables/Colors";
import Variables from "../Variables/Variables";
import Haptic from "../Functions/Haptic";

const Label = (props) => {

    const CURRENT_LABEL_OBJECT = Variables.LABELS[props.ID]

    const [CURRENT_LABEL_OBJECT_HOOK, SET_CURRENT_LABEL_OBJECT_HOOK] = useState(CURRENT_LABEL_OBJECT.p); // jag gör en hook till den så att knappen re-rendereras...


    return(
        <TouchableHighlight

            underlayColor={Colors.DARKEST_MAIN_COLOR} 
            style={[
                props.style, 
                {backgroundColor: (CURRENT_LABEL_OBJECT_HOOK == false) ? Colors.MAIN_COLOR : Colors.SELECTED}//Här satte jag CURRENT_LABEL_OBJECT_HOOK så att den re-redereras
                
            ]}
            
            onPress={() => {
                CURRENT_LABEL_OBJECT.p = (CURRENT_LABEL_OBJECT.p == false) ? true : false;//SWITCHAR VARIABELN CURRENT_LABEL_OBJECT.p
                SET_CURRENT_LABEL_OBJECT_HOOK(CURRENT_LABEL_OBJECT.p)//Updaterar hooken...
                Haptic("light")
            }}

        >
            <Text style={props.labelText}>
                {props.text}
            </Text>
        </TouchableHighlight>
    )
}

export default Label;