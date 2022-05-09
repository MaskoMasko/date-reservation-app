import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Login } from "../components/Login";
import { store } from "../store/store";

export const LoginScreen = ({ navigation }: any) => {
  useEffect(() => {
    store.getDateSpecifics();
    store.logout();
  }, []);
  return (
    <View style={styles.conatainer}>
      <Login navigation={navigation}></Login>
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBF00",
  },
});
