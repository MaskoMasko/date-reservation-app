import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { DateSpecificsScreen } from "./screens/DateSpecificsScreen";
import { FilterScreen } from "./screens/FilterDateScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MyReservationsScreen } from "./screens/MyReservationsScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => {
            return (
              <Drawer.Navigator>
                <Drawer.Screen name="Calendar" component={HomeScreen} />
                <Drawer.Screen name="Filter" component={FilterScreen} />
                <Drawer.Screen
                  name="My Reservations"
                  component={MyReservationsScreen}
                />
              </Drawer.Navigator>
            );
          }}
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <Stack.Screen name="DateSpecifics" component={DateSpecificsScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
