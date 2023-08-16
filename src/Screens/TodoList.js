import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import React, { useState } from "react";
import ToDoItem from "../Components/ToDoItem";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../Components/AppButton";

const TodoList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user.userInfo);
  const [todos, setTodos] = useState([{ title: "First Task", id: 0 }]);
  const { todo } = useSelector((state) => state.todo);
  console.log(todo);
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hi {username}</Text>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <AppButton
          title="Add task"
          onPress={() => navigation.navigate("AddTask")}
        />
      </View>

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
      />
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
});
