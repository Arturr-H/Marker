import React, { useState } from "react";
import { TouchableHighlight, Text } from "react-native";
import Colors from "../Variables/Colors";
import Variables from "../Variables/Variables";
import Haptic from "../Functions/Haptic";

const Label = (props) => {

    const CURRENT_LABEL_OBJECT = Variables.LABELS[props.ID]
    const [LabelBar_LABEL_STATUS, SET_LabelBar_LABEL_STATUS] = useState(true);

    const [CURRENT_LABEL_OBJECT_HOOK, SET_CURRENT_LABEL_OBJECT_HOOK] = useState(CURRENT_LABEL_OBJECT.p); // jag gör en hook till den så att knappen re-rendereras...


    return(
        <TouchableHighlight

            underlayColor={Colors.DARKEST_MAIN_COLOR} 
            style={[
                props.style, 
                {

                    backgroundColor: (props.LabelBar == false)//Olika select färger beroende på om det är LabelBar eller vanliga label selector
                        ?
                            (CURRENT_LABEL_OBJECT_HOOK == false) ? Colors.MAIN_COLOR : Colors.SELECTED//Här satte jag CURRENT_LABEL_OBJECT_HOOK så att den re-redereras
                        :
                            (LabelBar_LABEL_STATUS == false) ? Colors.SELECTED : Colors.MAIN_COLOR//Här satte jag CURRENT_LABEL_OBJECT_HOOK så att den re-redereras


                }
            ]}
            
            onPress={() => {

                // KORTFATTAT, DET FINNS 2 OLIKA SLAGS LABELS, EN SLAGS ÄR DEN SOM MAN VÄLJER FILTER, NÄR MAN KLICKAR MY MARKERS KNAPPEN
                // DEN ANDRA SLAGS FINNS NÄR MAN KLICKAR ADD MARKER SÅ MAN KAN LÄGGA TILL EN / FLERA TAGGAR TILL MARKERN,
                // DET ÄR DÄRFÖR DET FINNS 2 ST IF FUNCTIONS NEDANFÖR HÄR, DE 2 OLIKA LABELSARNA HAR 2 OLIKA FUNKTIONER

                if (props.LabelBar == true) { // OM LABELSARNA ÄR I FILTER RADEN

                    SET_LabelBar_LABEL_STATUS((LabelBar_LABEL_STATUS == false) ? true : false);

                    if (LabelBar_LABEL_STATUS == true) {
                        Variables.CURRENT_LABEL_FILTERS.push(CURRENT_LABEL_OBJECT.name)//lägger till den här labeln till marker label variabeln
                    }else{
                        Variables.CURRENT_LABEL_FILTERS.splice(Variables.CURRENT_LABEL_FILTERS.indexOf(CURRENT_LABEL_OBJECT.name), 1)//Shit vad lång men den lixom letar efter labeln som den ska ta bort med indexOf() och sen splicar ut den ur arrayn...
                    }
                }
                
                else{

                    CURRENT_LABEL_OBJECT.p = (CURRENT_LABEL_OBJECT.p == false) ? true : false;//SWITCHAR VARIABELN CURRENT_LABEL_OBJECT.p
                    SET_CURRENT_LABEL_OBJECT_HOOK(CURRENT_LABEL_OBJECT.p)//Updaterar hooken...

                    if (CURRENT_LABEL_OBJECT.p == true) {
                        Variables.CURRENT_MARKER_LABELS.push(CURRENT_LABEL_OBJECT.name)//lägger till den här labeln till marker label variabeln
                    }else{
                        Variables.CURRENT_MARKER_LABELS.splice(Variables.CURRENT_MARKER_LABELS.indexOf(CURRENT_LABEL_OBJECT.name), 1)//Shit vad lång men den lixom letar efter labeln som den ska ta bort med indexOf() och sen splicar ut den ur arrayn...
                    }
                }

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