import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import ToDo from "../Screens/ToDo";
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userInfo.username ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
        ) : (
          <Stack.Screen
            name="ToDo"
            component={ToDo}
            options={{ title: "To Do List" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
