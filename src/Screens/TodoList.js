import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import TaskCard from "../Components/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { userActions } from "../Redux/Slices/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { todoActions } from "../Redux/Slices/TodoSlice";
import Container from "../Components/Container";

const TodoList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user.userInfo);
  const { todo } = useSelector((state) => state.todo);
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  useFocusEffect(
    useCallback(() => {
      getTodoItems();
    }, [])
  );

  const getTodoItems = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (!storedTodos) {
        return;
      }
      const allTodos = JSON.parse(storedTodos) || [];
      const filteredTodos = allTodos.filter((todo) => todo.userId === username);
      dispatch(todoActions.setTodo(filteredTodos));
    } catch (e) {
      console.log("Error retrieving user todos: ", error);
    }
  };

  const handleRemoveTodo = (todoId) => {};

  const handleAddComment = async (todoId, newComment) => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      const allTodos = storedTodos ? JSON.parse(storedTodos) : [];
      // console.log({ allTodos });

      const todoIndex = allTodos.findIndex((todo) => todo.id === todoId);

      if (todoIndex !== -1) {
        const updatedTodo = {
          ...allTodos[todoIndex],
          comments: allTodos[todoIndex].comments
            ? [...allTodos[todoIndex].comments, newComment]
            : [newComment], // Initialize comments array if it doesn't exist
        };

        allTodos[todoIndex] = updatedTodo;
        await AsyncStorage.setItem("todos", JSON.stringify(allTodos));
        getTodoItems();
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const logout = () => {
    dispatch(userActions.removeUserInfo());
  };

  return (
    <Container noBottomInset>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={todo}
        renderItem={({ item }) => (
          <TaskCard
            todo={item}
            onRemoveTodo={handleRemoveTodo}
            onAddComment={handleAddComment}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <Text style={styles.welcomeText}>Hi {username}</Text>
        }
        style={{ marginVertical: -20 }}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
      />
      <Card style={styles.bottomTab}>
        <View style={styles.rowContainer}>
          <View style={{ alignItems: "center" }}>
            <IconButton
              mode="contained"
              icon="logout"
              size={30}
              onPress={logout}
              iconColor={colors.primary}
              color={colors.primary}
            />
            <Text variant="labelSmall">Logout</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <IconButton
              mode="contained"
              icon="check-circle-outline"
              size={30}
              onPress={() => navigation.navigate("AddTask")}
              iconColor={colors.primary}
              color={colors.primary}
            />
            <Text variant="labelSmall">2 Completed</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <IconButton
              mode="contained"
              icon="progress-pencil"
              size={30}
              onPress={() => navigation.navigate("AddTask")}
              iconColor={colors.primary}
              color={colors.primary}
            />
            <Text variant="labelSmall">{todo?.length} task</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <IconButton
              mode="contained"
              icon="plus"
              size={30}
              onPress={() => navigation.navigate("AddTask")}
              iconColor={colors.primary}
              color={colors.primary}
            />
            <Text variant="labelSmall">Add task</Text>
          </View>
        </View>
      </Card>
    </Container>
  );
};

export default TodoList;

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    welcomeText: {
      fontSize: 19,
      fontWeight: "700",
      marginBottom: 20,
      textAlign: "center",
    },
    bottomTab: {
      paddingTop: 16,
      marginHorizontal: -20,
      paddingBottom: 40,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 24,
    },
  });
