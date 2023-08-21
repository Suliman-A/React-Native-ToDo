import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../Redux/Slices/TodoSlice";
import AppButton from "../Components/AppButton";
import AppBottomSheet from "../Components/AppBottomSheet";
import { Text, TextInput, useTheme } from "react-native-paper";
import Container from "../Components/Container";
import Storage from "../Services/Storage";

const AddTask = ({ navigation }) => {
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.todo);
  const { username } = useSelector((state) => state.user.userInfo);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedPriority, setSelectedPriority] = useState();
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  const priorities = [
    { label: "High", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Low", value: 3 },
  ];

  const handleAddTodo = async () => {
    if (taskTitle.trim() === "" || !selectedPriority) {
      Alert.alert("Invalid input");
      return;
    }
    const newTodo = {
      title: taskTitle,
      id: uuid.v4(),
      userId: username,
      priority: selectedPriority.value,
      isCompleted: false,
    };

    const updatedTodoArray = [...todo, newTodo];
    dispatch(todoActions.setTodo(updatedTodoArray));

    try {
      const existingTodos = await Storage.getItem("todos");
      existingTodos.push(newTodo);
      await Storage.setItem("todos", existingTodos);

      setTaskTitle("");
    } catch (error) {
      console.error("Error adding todo: ", error);
    }

    Alert.alert("Task is saved", "Do you want to add another task", [
      {
        text: "Yes",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "No, go to the tasks list",
        onPress: () => navigation.navigate("TodoList"),
      },
    ]);
  };

  return (
    <Container scrollable>
      <Text style={styles.title}>Add new task to do</Text>
      <TextInput
        mode="outlined"
        placeholder="Title of the task"
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={styles.textInput}
      />
      <Text>Priority</Text>
      <AppBottomSheet
        data={priorities}
        title="Priority"
        placeholder="Choose priority"
        onSelect={(option) => {
          setSelectedPriority(option);
        }}
        value={selectedPriority?.label}
      />
      <View style={styles.buttonContainer}>
        <AppButton title="Save task" onPress={handleAddTodo} />
      </View>
    </Container>
  );
};

export default AddTask;

const getStyles = ({ colors }) =>
  StyleSheet.create({
    title: { fontSize: 19 },
    textInput: { marginVertical: 20 },
    buttonContainer: {
      alignItems: "center",
      marginBottom: 20,
      flex: 1,
      justifyContent: "flex-end",
    },
  });
