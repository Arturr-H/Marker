import React from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import Colors from "../Variables/Colors";
import Label from "./Label";
import Variables from "../Variables/Variables";

const WIDTH = Dimensions.get('window').width;

const LABEL_BAR = (props) => {


    return(
        <ScrollView style={styles.BAR} horizontal={true}>
            {
                Variables.LABELS.map((CURRENT_LABEL, INDEX) => {
                    return(
                        <Label 
                            text={CURRENT_LABEL.name}
                            style={styles.LABEL}
                            labelText={styles.LABEL_TEXT}
                            key={INDEX}
                            ID={INDEX}
                            LabelBar={true}
                        />
                    )
                })
            }
            <View style={styles.SCROLL_VIEW_RIGHT_MARGIN} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    BAR: {
        width: WIDTH,
        height: 50,
        maxHeight: 50,
        backgroundColor: Colors.SECONDARY_COLOR,
        alignSelf: "center",
        paddingHorizontal: 20,
        zIndex: 0
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
    SCROLL_VIEW_RIGHT_MARGIN: {
        marginHorizontal: 20,
    },
    LABEL_TEXT: {
        fontWeight: "200",
        fontSize: 12,
    },
});

export default LABEL_BAR;