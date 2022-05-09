import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Register } from "../components/Register";

export const RegisterScreen = observer(({ navigation }: any) => {
  return (
    <View style={styles.mainContainer}>
      <Register navigation={navigation}></Register>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFBF00",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
