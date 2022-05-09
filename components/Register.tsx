import { observer } from "mobx-react-lite";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { store } from "../store/store";

export const Register = observer(({ navigation }: any) => {
  return (
    <View style={styles.whiteContainer}>
      <View style={styles.mainRegisterHeadingContainer}>
        <Text style={styles.mainRegisterHeading}>Register</Text>
      </View>
      <Text style={styles.registerHeadings}>Username</Text>
      <TextInput placeholder="Enter Username"></TextInput>
      <Text style={styles.registerHeadings}>Email</Text>
      <TextInput placeholder="Enter Email"></TextInput>
      <Text style={styles.registerHeadings}>Password</Text>
      <TextInput placeholder="Enter Password"></TextInput>
      <Text style={styles.registerHeadings}>Confirm Password</Text>
      <TextInput placeholder="Repeat Password"></TextInput>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.submitBtn}
        onPress={() => {
          store.register();
          store.islogged();
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  whiteContainer: {
    width: 300,
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    padding: 20,
  },
  mainRegisterHeadingContainer: {
    alignSelf: "center",
    margin: 10,
  },
  mainRegisterHeading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  registerHeadings: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D1D3B",
    marginLeft: 0,
    margin: 10,
  },
  submitText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    padding: 10,
  },
  submitBtn: {
    backgroundColor: "#1D1D3B",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
});
