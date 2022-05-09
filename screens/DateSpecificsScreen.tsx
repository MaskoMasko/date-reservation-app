import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DateSpecifics } from "../components/DateSpecifics";

export const DateSpecificsScreen = observer(() => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFBF00" }}>
      <Text style={styles.mainHeading}>RESERVE</Text>
      <DateSpecifics></DateSpecifics>
    </View>
  );
});

const styles = StyleSheet.create({
  mainHeading: {
    fontWeight: "bold",
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 80,
    color: "#1D1D3B",
  },
});
