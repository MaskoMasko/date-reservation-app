import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { store } from "../store/store";

export const Login = observer(({ navigation }: any) => {
  const [userEmail, setUserEmail] = useState("leonlav77@gmail.com");
  const [userPassword, setUserPassword] = useState("password");
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Welcome</Text>
      <Text style={styles.inputHeader}>Email</Text>
      <TextInput
        placeholder="Enter Email"
        style={styles.inputFields}
        onSubmitEditing={(e) => {
          setUserEmail(e.nativeEvent.text);
          // store.login(userEmail, userPassword);
        }}
      ></TextInput>
      <Text style={styles.inputHeader}>Password</Text>
      <TextInput
        placeholder="Enter Password"
        style={styles.inputFields}
        onSubmitEditing={(e) => {
          setUserPassword(e.nativeEvent.text);
          // store.login(userEmail, userPassword);
        }}
      ></TextInput>
      <View style={{ flexDirection: "row" }}>
        <Text>U dont have acc... </Text>
        <Text
          style={{ color: "#1D1D3B", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.loginButton}
        onPress={() => {
          store.login(userEmail, userPassword);
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  loginButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  loginButton: {
    width: 250,
    height: 50,
    backgroundColor: "#1D1D3B",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  inputFields: {
    alignSelf: "flex-start",
    marginLeft: 30,
    padding: 10,
    margin: 5,
    borderColor: "lightgrey",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    width: 250,
  },
  inputHeader: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 30,
    color: "#1D1D3B",
    marginBottom: 10,
  },
  mainHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1D1D3B",
  },
  mainContainer: {
    position: "absolute",
    width: 300,
    height: 390,
    backgroundColor: "#F9F9F9",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
