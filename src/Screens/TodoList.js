import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import TaskCard from "../Components/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  IconButton,
  SegmentedButtons,
  Text,
  useTheme,
} from "react-native-paper";
import { userActions } from "../Redux/Slices/UserSlice";
import { useFocusEffect } from "@react-navigation/native";
import { todoActions } from "../Redux/Slices/TodoSlice";
import Container from "../Components/Container";
import Storage from "../Services/Storage";

const TodoList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user.userInfo);
  const { todo } = useSelector((state) => state.todo);
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const [sortingCriteria, setSortingCriteria] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getTodoItems();
    }, [sortingCriteria])
  );

  const getTodoItems = async () => {
    try {
      const storedTodos = await Storage.getItem("todos");
      if (!storedTodos) {
        return;
      }
      const filteredTodos = storedTodos.filter(
        (todo) => todo.userId === username
      );

      applySorting(filteredTodos, sortingCriteria);
    } catch (e) {
      console.log("Error retrieving user todos: ", error);
    }
  };

  const handleRemoveTodo = async (todoId) => {
    try {
      // Remove todo from Redux
      dispatch(todoActions.removeTodo(todoId));

      // Remove todo from AsyncStorage
      const storedTodos = await Storage.getItem("todos");
      const updatedTodos = storedTodos.filter((item) => item.id !== todoId);
      await Storage.setItem("todos", updatedTodos);
    } catch (error) {
      console.error("Error removing todo: ", error);
    }
  };

  const handleAddComment = async (todoId, newComment) => {
    try {
      const storedTodos = await Storage.getItem("todos");

      const todoIndex = storedTodos.findIndex((todo) => todo.id === todoId);

      if (todoIndex !== -1) {
        const updatedTodo = {
          ...storedTodos[todoIndex],
          comments: storedTodos[todoIndex].comments
            ? [...storedTodos[todoIndex].comments, newComment]
            : [newComment], // Initialize comments array if it doesn't exist
        };

        storedTodos[todoIndex] = updatedTodo;
        await Storage.setItem("todos", storedTodos);
        getTodoItems();
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const getCompletedTaskCount = () => {
    return todo.filter((task) => task.isCompleted).length;
  };

  const handleSorting = (criteria) => {
    setSortingCriteria(criteria);
    applySorting([...todo], criteria);
  };

  const applySorting = (items, criteria) => {
    if (criteria.includes("alphabetical")) {
      items.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (criteria.includes("priority")) {
      items.sort((a, b) => a.priority - b.priority);
    }

    dispatch(todoActions.setTodo([...items]));
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
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.welcomeText}>Hi {username}</Text>
            <SegmentedButtons
              multiSelect
              value={sortingCriteria}
              onValueChange={handleSorting}
              buttons={[
                {
                  icon: "sort-alphabetical-ascending",
                  value: "alphabetical",
                  label: "Sort by name",
                },
                {
                  value: "priority",
                  label: "Sort by priority",
                },
              ]}
            />
          </View>
        }
        ListEmptyComponent={
          <Text
            style={{
              ...styles.welcomeText,
              textAlign: "center",
              color: colors.onSurfaceVariant,
            }}
          >
            No tasks to do
          </Text>
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
            <Text variant="labelSmall" style={styles.tabLabel}>
              Logout
            </Text>
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
            <Text variant="labelSmall" style={styles.tabLabel}>
              {getCompletedTaskCount()} Completed
            </Text>
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
            <Text variant="labelSmall" style={styles.tabLabel}>
              {todo?.length} task
            </Text>
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
            <Text variant="labelSmall" style={styles.tabLabel}>
              Add task
            </Text>
          </View>
        </View>
      </Card>
    </Container>
  );
};

export default TodoList;

const getStyles = ({ colors }) =>
  StyleSheet.create({
    welcomeText: {
      fontSize: 19,
      fontWeight: "700",
      marginBottom: 20,
      // textAlign: "center",
    },
    bottomTab: {
      paddingTop: 16,
      marginHorizontal: -20,
      paddingBottom: 40,
      borderRadius: 0,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 24,
    },
    tabLabel: { color: colors.primary, fontSize: 12, fontWeight: "700" },
  });
