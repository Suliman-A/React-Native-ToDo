import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import { useSelector } from "react-redux";
import TodoList from "../Screens/TodoList";
import AddTask from "../Screens/AddTask";
import { PaperProvider } from "react-native-paper";
import { DarkTheme } from "../Theme/DarkTheme";
import { LightTheme } from "../Theme/LightTheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import EditTask from "../Screens/EditTask";
import { StatusBar } from "expo-status-bar";

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
        options={{ title: "Todo List" }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{ title: "Add task" }}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={{ title: "Edit task" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={LightTheme}>
        <NavigationContainer theme={LightTheme}>
          <StatusBar style="auto" />
          {!userInfo.username ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
