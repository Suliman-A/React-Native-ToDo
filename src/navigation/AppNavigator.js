import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import { useSelector } from "react-redux";
import TodoList from "../Screens/TodoList";
import AddTask from "../Screens/AddTask";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={{ title: "To Do List" }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{ title: "To Do List" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <NavigationContainer>
      {!userInfo.username ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
