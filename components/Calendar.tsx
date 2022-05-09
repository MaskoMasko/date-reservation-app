import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LogBox,
} from "react-native";
import { store } from "../store/store";

LogBox.ignoreLogs([
  "Warning: Cannot update a component from inside the function body of a different component.",
]);

export const Calendar = observer(({ navigation }: any) => {
  useEffect(() => {
    for (let availableDate of _.uniq(store.availableDates)) {
      store.addIDs(
        new Date(
          parseInt(availableDate.split("-")[0]),
          parseInt(availableDate.split("-")[1]) - 1,
          -1
        ).getDay() + parseInt(availableDate.split("-")[2])
      );
    }
  }, []);
  //ovo se executa prije nego effect na screenu
  useEffect(() => {
    store.clearDays();
    store.getDaysInMonth;
    store.addBlanks(
      new Date(store.currentYear, store.currentMonth, -1).getDay() + 1
    );
  }, [store.currentMonth]);
  return (
    <View style={styles.mainMargins}>
      <FlatList
        data={store.days}
        keyExtractor={(weekDay) => weekDay}
        horizontal={true}
        renderItem={({ item: weekDay, index }) => {
          return <Text style={styles.weekDays}>{weekDay}</Text>;
        }}
      ></FlatList>
      {/**/}
      <View style={styles.monthDays}>
        {store.daysInMonth.map((monthDay, id) => {
          let { completeDay, completeMonth } = store.getCompletedDates(
            monthDay,
            id
          );
          return (
            <TouchableOpacity
              onPress={() => {
                store.setDate(
                  `${store.currentYear.toString()}-${[
                    store.currentMonth + 1,
                  ].toString()}-${completeDay}`
                );
                navigation.navigate("DateSpecifics");
              }}
              disabled={
                !store.availableDates.includes(
                  store.currentYear + "-" + completeMonth + "-" + completeDay
                )
              }
              key={id}
            >
              <Text
                style={[
                  styles.daysDefault,
                  store.currentDay.toString() == store.daysInMonth[id] &&
                  store.currentMonth + 1 == new Date().getMonth() + 1 &&
                  store.currentYear == new Date().getFullYear()
                    ? styles.currentDay
                    : store.availableDates.includes(
                        store.currentYear +
                          "-" +
                          completeMonth +
                          "-" +
                          completeDay
                      )
                    ? styles.availableDay
                    : styles.disabledDay,
                ]}
              >
                {monthDay}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.monthYear}>
        {store.months[store.currentMonth]} | {store.currentYear}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btns}
          onPress={store.prevMonth}
        >
          <Text style={styles.btnText}>PREV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btns}
          onPress={store.nextMonth}
        >
          <Text style={styles.btnText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  btns: {
    width: 100,
    backgroundColor: "black",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  monthYear: {
    alignSelf: "center",
    margin: 0,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 120,
  },
  daysDefault: {
    minWidth: 20,
    margin: 14,
    transform: [{ translateX: 7 }],
  },
  monthDays: {
    flexWrap: "wrap",
    width: 350,
    maxHeight: 200,
    flexDirection: "row",
  },
  weekDays: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  mainMargins: { margin: 80, marginTop: 40, marginHorizontal: 20 },
  currentDay: {
    color: "white",
    backgroundColor: "#FFBF00",
    borderRadius: 20,
    padding: 2,
    margin: 12,
  },
  availableDay: {
    color: "black",
    backgroundColor: "white",
    padding: 0,
    margin: 14,
  },
  disabledDay: {
    color: "lightgray",
    backgroundColor: "white",
    padding: 0,
    margin: 14,
  },
});
