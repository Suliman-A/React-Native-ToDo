import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Card,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import uuid from "react-native-uuid";

const ToDoItem = ({ todo, onRemoveTodo }) => {
  const { colors } = useTheme();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const styles = getStyles({ colors });

  const handleAddComment = () => {
    if (commentText.trim() === "") {
      return;
    }
    const newComment = { id: uuid.v4(), text: commentText };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <>
          <View style={styles.card_header}>
            <Text style={styles.title}>{todo.title || "Title"}</Text>
            <View style={styles.iconsContainer}>
              <IconButton
                onPress={() => setIsEditing(true)}
                icon="pencil-circle"
                size={32}
                color="orange"
                iconColor="orange"
                style={{ marginRight: -10 }}
              />
              <IconButton
                onPress={() => onRemoveTodo(todo.id)}
                icon="delete-circle"
                size={32}
                iconColor="red"
              />
            </View>
          </View>
          <View style={styles.priorityContainer}>
            <Text variant="titleMedium">Priority</Text>
            <Text>...</Text>
          </View>
          <Text variant="titleMedium">Comments</Text>
          <View style={styles.commentsContainer}>
            {comments.map((comment) => (
              <View key={comment.id}>
                <View style={styles.comment}>
                  <Text>{comment.text}</Text>
                </View>
              </View>
            ))}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                placeholder="Add a comment"
                value={commentText}
                onChangeText={setCommentText}
                style={styles.textInput}
                onSubmitEditing={handleAddComment}
              />
            </View>
          </View>
        </>
      </Card.Content>
    </Card>
  );
};

export default ToDoItem;

const getStyles = ({ colors }) =>
  StyleSheet.create({
    card: { marginBottom: 24, backgroundColor: "#fff" },
    card_header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomColor: colors.outline,
      borderBottomWidth: 1,
      paddingBottom: 20,
      marginBottom: 20,
    },
    title: {
      fontWeight: "700",
      fontSize: 19,
      flex: 1,
      maxWidth: "60%",
    },
    priorityContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    commentsContainer: {
      marginTop: 5,
    },
    comment: {
      // flexDirection: "row",
      // alignItems: "center",
      // justifyContent: "space-between",
      borderBottomColor: colors.outline,
      borderBottomWidth: 0.5,
      paddingLeft: 8,
      paddingVertical: 8,
    },
    iconsContainer: {
      flexDirection: "row",
    },
    inputContainer: {
      marginVertical: 10,
    },
    textInput: {
      flex: 1,
    },
  });
