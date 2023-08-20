import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, IconButton, Switch, Text, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import AppBottomSheet from "./AppBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoActions } from "../Redux/Slices/TodoSlice";
import { useDispatch } from "react-redux";

const TaskCard = ({ todo, onRemoveTodo, onAddComment }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [commentText, setCommentText] = useState("");
  const styles = getStyles({ colors });
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [visible, setVisible] = useState(false);

  const handleAddComment = async () => {
    if (commentText.trim() === "") {
      return;
    }
    const newComment = { id: uuid.v4(), text: commentText };
    setCommentText("");
    onAddComment(todo.id, newComment);
  };

  const handleToggleCompleted = async () => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    dispatch(todoActions.completeTodo(todo.id));

    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      const allTodos = storedTodos ? JSON.parse(storedTodos) : [];

      const updatedTodos = allTodos.map((t) =>
        t.id === todo.id ? updatedTodo : t
      );

      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error updating completed status: ", error);
    }
  };

  const getPriority = (val) => {
    if (val == 1) {
      return "High";
    } else if (val == 2) {
      return "Meduim";
    } else if (val === 3) {
      return "Low";
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{todo.title || "Title"}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.switchContainer}>
            <Text>Completed</Text>
            <Switch
              style={{ alignSelf: "center" }}
              value={todo.isCompleted}
              // onValueChange={(value) => setIsCompleted(value)}
              onValueChange={handleToggleCompleted}
            />
          </View>
          <View>
            <Text>Priority</Text>
            <Text style={styles.priorityText}>
              {getPriority(todo.priority)}
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.commentIconButton}>
            <AppBottomSheet
              data={todo?.comments}
              title="Comments"
              commentsView={true}
              commentText={commentText}
              setCommentText={setCommentText}
              handleAddComment={handleAddComment}
              customPicker={
                <View style={styles.commentIconButton}>
                  <FontAwesome5 name="comment-alt" size={18} color="black" />
                  <Text variant="labelMedium">
                    {todo?.comments?.length} Comments
                  </Text>
                </View>
              }
            />
          </View>
          <IconButton
            onPress={() => navigation.navigate("EditTask", { todo: todo })}
            icon="pencil-circle"
            size={32}
            color="orange"
            iconColor="orange"
            // style={{ borderWidth: 1 }}
          />
          <IconButton
            onPress={() => onRemoveTodo(todo.id)}
            icon="delete-circle"
            size={32}
            iconColor="red"
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default TaskCard;

const getStyles = ({ colors }) =>
  StyleSheet.create({
    card: { marginBottom: 24, borderRadius: 12 },
    cardHeader: { marginBottom: 20 },
    title: {
      fontWeight: "700",
      fontSize: 19,
      flex: 1,
    },
    priorityText: { textAlign: "center", marginTop: 5, fontWeight: "700" },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    switchContainer: {
      gap: 10,
    },
    iconsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    bottomContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      borderTopWidth: 0.5,
      borderTopColor: colors.outline,
      // alignItems: "flex-end",
    },
    commentIconButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
  });
