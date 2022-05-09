import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { Calendar } from "../components/Calendar";
import { store } from "../store/store";

export const HomeScreen = observer(({ navigation }: any) => {
  useEffect(() => {
    store.userInfo();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.calendarContainer}>
        <Calendar navigation={navigation}></Calendar>
      </View>
      <View style={styles.yellowPart}></View>
    </View>
  );
});

const styles = StyleSheet.create({
  yellowPart: {
    backgroundColor: "#FFBF00",
    height: "45%",
    transform: [{ translateY: -50 }],
  },
  calendarContainer: {
    height: "70%",
    borderRadius: 25,
    width: "100%",
    backgroundColor: "white",
    zIndex: 2,
  },
});
