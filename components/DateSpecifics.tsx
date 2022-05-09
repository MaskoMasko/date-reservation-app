import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { store } from "../store/store";

export const DateSpecifics = observer(() => {
  useEffect(() => {
    store.clearDayData();
    store.getDateSpecifics();
  }, []);
  return (
    <ScrollView>
      {store.dayData.map((time, id) => {
        return (
          <TouchableOpacity
            key={id}
            activeOpacity={0.5}
            style={[
              styles.timeContainers,
              time.status == "occupied" ? styles.ifOccupied : styles.ifFree,
            ]}
            onPress={() => {
              store.toggleReservations(id);
              store.reserveDate(store.date, time.time);
            }}
          >
            <Text
              style={[
                styles.timeText,
                time.status == "occupied"
                  ? { color: "white" }
                  : { color: "#1D1D3B" },
              ]}
            >
              {time.time} - {time.time + 2} (hrs)
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  timeText: { fontWeight: "bold", fontSize: 22 },
  ifOccupied: { backgroundColor: "#1D1D3B" },
  ifFree: { backgroundColor: "lightgray" },
  timeContainers: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    marginHorizontal: "10%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
