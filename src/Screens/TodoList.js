import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ToDoItem from "../Components/ToDoItem";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../Components/AppButton";
import { IconButton, Text, useTheme } from "react-native-paper";
import { userActions } from "../Redux/Slices/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const TodoList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { username } = useSelector((state) => state.user.userInfo);
  const [todos, setTodos] = useState([]);
  const { todo } = useSelector((state) => state.todo);
  // console.log(todo);

  useFocusEffect(
    useCallback(() => {
      getTodoItems();
    }, [username])
  );

  const getTodoItems = async () => {
    // Retrieve todos from AsyncStorage and filter by user
    try {
      const data = await AsyncStorage.getItem("todos");
      if (!data) {
        return;
      }
      const allTodos = JSON.parse(data) || [];
      const filteredTodos = allTodos.filter((todo) => todo.userId === username);
      setTodos(filteredTodos);
    } catch (e) {
      console.log("Error retrieving user todos: ", error);
    }
  };

  const handleUpdateTodo = (todoId, updatedTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, title: updatedTitle } : todo
      )
    );
  };

  const handleRemoveTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const logout = () => {
    dispatch(userActions.removeUserInfo());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hi {username}</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            onUpdateTodo={handleUpdateTodo}
            onRemoveTodo={handleRemoveTodo}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
      <View style={styles.buttonsContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <IconButton
              mode="contained"
              icon="logout"
              size={40}
              onPress={logout}
              iconColor={colors.error}
              color={colors.error}
            />
            {/* <Text variant="labelSmall">Logout</Text> */}
          </View>
          <View style={{ alignItems: "center" }}>
            <IconButton
              mode="contained"
              icon="plus"
              size={40}
              onPress={() => navigation.navigate("AddTask")}
              iconColor={colors.primary}
              color={colors.primary}
            />
            {/* <Text variant="labelSmall">Add task</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  welcomeText: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 40,
    // flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    // marginBottom: 40,
  },
});
