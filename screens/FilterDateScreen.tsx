import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { store } from "../store/store";

export const FilterScreen = observer(({ navigation }: any) => {
  const [toggle, setToggle] = useState<null | boolean>(null);
  useEffect(() => {
    store.getDateSpecifics();
    for (let i = 0; i < store.IDsForWeekDays.length; i++) {
      store.addToDatesWithWeekDays(
        _.uniq(store.availableDates)[i],
        store.days[
          (i +
            new Date(
              parseInt(store.availableDates[i].split("-")[0]),
              parseInt(store.availableDates[i].split("-")[1]),
              -1
            ).getDay() +
            1) %
            7
        ]
      );
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <SelectDropdown
        defaultButtonText="Select Date"
        dropdownStyle={{ width: 350, aspectRatio: 1 }}
        buttonStyle={{ backgroundColor: "red" }}
        data={_.uniq(store.datesWithWeekDays)}
        onSelect={(selectedItem, index) => {
          store.clearFreeHours();
          setToggle(true);
          for (let dayObject of store.filteredDaysByDate) {
            if (
              dayObject.date == selectedItem.split(" ")[0] &&
              dayObject.status == "free"
            ) {
              store.addToFreeHours(dayObject.date, dayObject.time);
            }
          }
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          if (toggle) {
            return selectedItem;
          } else {
            return "Select Date";
          }
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <SelectDropdown
        defaultButtonText="Select Day"
        dropdownStyle={{ width: 350, aspectRatio: 1 }}
        buttonStyle={{ backgroundColor: "aliceblue" }}
        data={store.fullNameDays}
        onSelect={(selectedItem, index) => {
          store.clearFilteredByDays();
          setToggle(false);
          for (let dateWithWeekDay of _.uniq(store.datesWithWeekDays)) {
            if (selectedItem.startsWith(dateWithWeekDay.split(" ")[1])) {
              store.addToFilteredByDays(dateWithWeekDay);
            }
          }
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          if (!toggle) return selectedItem;
          else return "Select Day";
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <View>
        {toggle == null ? null : !toggle ? (
          <FlatList
            data={store.filteredByDays}
            keyExtractor={(day) => Date.now() + Math.random().toString()}
            renderItem={({ item: date, index }) => {
              return (
                <View>
                  <Text>{date}</Text>
                </View>
              );
            }}
          ></FlatList>
        ) : (
          <FlatList
            data={store.freeHours}
            keyExtractor={(day) => Date.now() + Math.random().toString()}
            renderItem={({ item: dateObject, index }) => {
              return (
                <View>
                  <Text>{dateObject.date}</Text>
                  <Text>
                    {dateObject.time}-{dateObject.time + 2}
                  </Text>
                </View>
              );
            }}
          ></FlatList>
        )}
      </View>
    </View>
  );
});
