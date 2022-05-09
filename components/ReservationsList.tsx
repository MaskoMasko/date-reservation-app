import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { store } from "../store/store";

export const ReservationsList = observer(() => {
  return (
    <ScrollView>
      {store.reservationList.map((reservation: any, id: any) => {
        return (
          <View key={id} style={styles.reservationContainer}>
            <Text>Reserved Date: {reservation.date}</Text>
            <Text>
              {reservation.time}-{reservation.time + 2} hours
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  reservationContainer: { margin: 10, backgroundColor: "lightgray" },
});
