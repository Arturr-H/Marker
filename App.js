import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput, ScrollView, Animated } from 'react-native';
/*   »»» VARIABLES «««    */
/*                        */
import Colors from './Marker-Components/Variables/Colors';
import Variables from './Marker-Components/Variables/Variables';
/*                        */
/*   »»» VARIABLES «««    */


/*   »»» FUNCTIONS «««    */
/*                        */
import Haptic from './Marker-Components/Functions/Haptic';
/*                        */
/*   »»» FUNCTIONS «««    */


/*   »»» COMPONENTS «««   */
/*                        */
import Label from './Marker-Components/DefaultComponents/Label';
import Map, { POS_LATITUDE, POS_LONGITUDE } from './Marker-Components/DefaultComponents/Map';
import D_Button from './Marker-Components/DefaultComponents/D_Button';
import Navigation_Bar from './Marker-Components/DefaultComponents/Navigation-bar';
/*                        */
/*   »»» COMPONENTS «««   */


/*
ALL DEFINITIONS HERE

MC = MARKER CONFIG
MCS = MARKER CONFIG STATUS

▽▽ GIT IGNORE ▽▽

node_modules/
.expo/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/

*/


/*
MÅSTE GÖRA

FÅ NSUserDefaults att fungera

*/


const App = () => {


    const[MAP_UI_STYLE, SET_MAP_UI_STYLE] = useState("dark")

    const[ADD_MARKER_BUTTON_STATUS, SET_ADD_MARKER_BUTTON_STATUS] = useState("New Marker")

    const Animate = (ANIMATION, END_VALUE) => {
        Animated.timing(ANIMATION, {
            toValue: END_VALUE,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    function RESET_LABELS() {
        for (let i = 0; i < Variables.LABELS.length; i++) {//Loopar igenom varje label
            Variables.LABELS[i].p = false;//och sätter alla till false (inte selectad)
        }
    }

    const[MC_DESCRIPTION, SET_MC_DESCRIPTION] = useState("");
    const[MC_NAME, SET_MC_NAME] = useState("");
    const[MC_LABELS, SET_MC_LABELS] = useState(Variables.LABELS);


    const[ADDMARKER_BTN_BR, SET_ADDMARKER_BTN_BR] = useState(5);
    
    const MARKER_CONFIG_AREA_Yp = useRef(new Animated.Value(0)).current;

    const[MODIFYING_MARKER_CONFIG, SET_MODIFYING_MCS] = useState(false);
    function TOGGLE_MODIFYING_MCS() {

        /* ANIMATE CONFIG AREA DOWN */
        /* ANIMATE CONFIG AREA DOWN */

        Animate(MARKER_CONFIG_AREA_Yp, 0)

        Haptic("heavy")

        /* CHECK IF ACTUALLY PLACE MARKER OR JUST CANCEL */
        /* CHECK IF ACTUALLY PLACE MARKER OR JUST CANCEL */

        if (MC_NAME != "") {
            Variables.MARKERS.push({
                name: MC_NAME,
                description: MC_DESCRIPTION,
                lat: POS_LATITUDE,
                lon: POS_LONGITUDE,

                AnimX: 50,
                AnimY: -50,
            },)
        }
        function Down() {
            SET_MODIFYING_MCS(false)
            RESET_LABELS();
            SET_MC_NAME("");
            SET_MC_DESCRIPTION("");
            SET_ADD_MARKER_BUTTON_STATUS("New Marker")
            setTimeout(() => {
                SET_ADDMARKER_BTN_BR(Variables.DEFAULT_BORDER_RADIUS)
            }, 100);
        }
        function Up() {
            Animate(MARKER_CONFIG_AREA_Yp, -150)
            SET_MODIFYING_MCS(true)
            SET_ADD_MARKER_BUTTON_STATUS("Cancel")
            SET_ADDMARKER_BTN_BR(0)
        }
        (MODIFYING_MARKER_CONFIG == false) ? Up() : Down();
    }
    return(
        <View style={styles.APP_CONTAINER}>
            <Map UI={MAP_UI_STYLE}/>


            <Navigation_Bar>

            </Navigation_Bar>

            <TouchableHighlight style={[styles.BUTTON, {borderRadius: ADDMARKER_BTN_BR}]} onPress={() => 
                {
                    TOGGLE_MODIFYING_MCS()
                    RESET_LABELS()
                }} 
                underlayColor={Colors.DARKENED_MAIN_COLOR}>
                <View>

                    <Text style={styles.TEXT}>{ADD_MARKER_BUTTON_STATUS}</Text>

                </View>
            </TouchableHighlight>

            <Animated.View style={[styles.TEXT_INPUT_CONTAINER, {transform: [{translateY: MARKER_CONFIG_AREA_Yp}]}]}>
                
                <ScrollView horizontal={true} style={styles.SCROLL_VIEW}>

                    {
                        Variables.LABELS.map((CURRENT_LABEL, INDEX) => {
                            return(
                                <Label 
                                    text={CURRENT_LABEL.name}
                                    style={styles.LABEL}
                                    labelText={styles.LABEL_TEXT}
                                    key={INDEX}
                                    ID={INDEX}
                                />
                            )
                        })
                    }
                    <View style={styles.SCROLL_VIEW_RIGHT_MARGIN} />
                    {/* FIXAR MARGINEN PÅ SCROLLVIEWEN */}

                </ScrollView>

                <TextInput
                    onSubmitEditing={
                        (e) => SET_MC_DESCRIPTION(e.nativeEvent.text)
                    }
                    autoCorrect={true}
                    placeholder="Enter Marker description..." 
                    style={styles.TEXT_INPUT} 
                />
                <TextInput
                    onSubmitEditing={
                        (e) => {
                            SET_MC_NAME(e.nativeEvent.text)
                            if(e.nativeEvent.text != "") { // Om configen inte har fått ett marker namn än så ska det fortfarande stå cancel istället för "new marker"
                                SET_ADD_MARKER_BUTTON_STATUS("Add Marker")
                            }else{
                                SET_ADD_MARKER_BUTTON_STATUS("Cancel")
                            }
                        }
                    }
                    autoCorrect={false}
                    placeholder="Enter Marker name... (required)"
                    style={[
                        styles.TEXT_INPUT, 
                        {backgroundColor: Colors.DARKENED_MAIN_COLOR}
                    ]}
                
                />

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    APP_CONTAINER: {
        flex: 1,
        
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    SCROLL_VIEW: {
        width: Variables.MARKER_CONFIG_AREA_WIDTH,
        height: 20,
        backgroundColor: Colors.DARKENED_MAIN_COLOR,
        paddingHorizontal: 15,
        height: 10,
        flex: 1,
        zIndex: 4,

        borderTopRightRadius: Variables.DEFAULT_BORDER_RADIUS,
        borderTopLeftRadius: Variables.DEFAULT_BORDER_RADIUS,


        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap",
    },
    LABEL: {
        backgroundColor: "yellow",
        alignItems: "center",
        marginHorizontal: 4,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",

        height: 25, // HEIGHT
        marginVertical: 12.5, // HALF OF HEIGHT
        borderRadius: Variables.DEFAULT_BORDER_RADIUS / 1.5,
        borderColor: Colors.LINE_COLOR,
        borderWidth: 1,
    },
    LABEL_TEXT: {
        fontWeight: "200",
        fontSize: 12,
    },
    SCROLL_VIEW_RIGHT_MARGIN: {
        marginHorizontal: 18,
    },
    BUTTON: {
        backgroundColor: Colors.MAIN_COLOR,
        
        bottom: 0,
        position: "absolute",

        width: Variables.MARKER_CONFIG_AREA_WIDTH,
        height: 150,
        paddingTop: 20,

        
        zIndex: 5,
    },
    TEXT: {
        fontWeight: "200",
        fontSize: 20,
        alignSelf: "center",
    },
    TEXT_INPUT: {
        width: Variables.MARKER_CONFIG_AREA_WIDTH,
        height: 20,
        backgroundColor: Colors.MAIN_COLOR,
        paddingHorizontal: 15,
        height: 10,
        flex: 1,
        zIndex: 4,
    },
    TEXT_INPUT_CONTAINER: {
        flexDirection: "column",
        flex: 1,
        height: 150,// TEXT INPUTTENS HEIGHT, DE ANDRA SCALAS MED.
        bottom: 0, 
        position: "absolute",
    },
})
export default App;