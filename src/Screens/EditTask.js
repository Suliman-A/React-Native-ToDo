import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Switch, Text, useTheme } from "react-native-paper";
import AppButton from "../Components/AppButton";
import Container from "../Components/Container";
import AppBottomSheet from "../Components/AppBottomSheet";
import Storage from "../Services/Storage";

const EditTask = ({ route, navigation }) => {
  const { todo } = route.params;
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);
  const [selectedPriority, setSelectedPriority] = useState();
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [comments, setComments] = useState(todo.comments);
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  const priorities = [
    { label: "High", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Low", value: 3 },
  ];

  const handleSave = async () => {
    try {
      const updatedTodo = {
        ...todo,
        title: title,
        priority: selectedPriority?.value || priority,
        isCompleted: isCompleted,
        comments: comments || [],
      };

      // Update the todo item in AsyncStorage
      const storedTodos = await Storage.getItem("todos");
      const updatedTodos = storedTodos.map((item) =>
        item.id === updatedTodo.id ? updatedTodo : item
      );
      await Storage.setItem("todos", updatedTodos);

      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error("Error saving updated todo: ", error);
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const handleUpdateComment = (commentId, updatedText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: updatedText } : comment
    );
    setComments(updatedComments);
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

  console.log({ isCompleted });
  return (
    <Container scrollable>
      <TextInput
        mode="outlined"
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Text>Priority</Text>
      <AppBottomSheet
        data={priorities}
        title="Priority"
        placeholder="Choose priority"
        onSelect={(option) => {
          setSelectedPriority(option);
        }}
        value={
          selectedPriority?.label
            ? selectedPriority.label
            : getPriority(priority)
        }
      />
      <View style={styles.switchContainer}>
        <Text>Completed:</Text>
        <Switch
          value={isCompleted}
          onValueChange={(value) => setIsCompleted(value)}
        />
      </View>
      {comments?.map((comment) => (
        <View key={comment.id} style={styles.commentContainer}>
          <TextInput
            mode="outlined"
            label="Comment"
            value={comment.text}
            onChangeText={(updatedText) =>
              handleUpdateComment(comment.id, updatedText)
            }
            style={styles.commentInput}
            right={
              <TextInput.Icon
                icon="delete-circle"
                onPress={() => handleDeleteComment(comment.id)}
              />
            }
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <AppButton title="Save" onPress={handleSave} />
      </View>
    </Container>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    input: {
      marginBottom: 20,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 30,
      gap: 10,
    },
    commentContainer: {
      marginBottom: 10,
    },
    commentInput: {
      marginBottom: 5,
    },
    buttonContainer: { flex: 1, justifyContent: "flex-end", marginBottom: 30 },
  });

export default EditTask;
