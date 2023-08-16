import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import AppButton from "../Components/AppButton";
import { todoActions } from "../Redux/Slices/TodoSlice";

const AddTask = ({ navigation }) => {
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.todo);
  const { username } = useSelector((state) => state.user.userInfo);

  console.log(todo);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedPriority, setSelectedPriority] = useState();
  const priorities = [
    { label: "High priority task", value: 1 },
    { label: "Medium priority task", value: 2 },
    { label: "Low priority task", value: 3 },
  ];

  const handleAddTodo = () => {
    if (taskTitle.trim() === "" || !selectedPriority) {
      Alert.alert("Invalid input");
      return;
    }
    const newTodo = {
      title: taskTitle,
      id: todo.length + 1,
      userId: username,
      priority: selectedPriority,
      isCompleted: false,
    };
    // setTodos([...todos, newTodo]);
    const updatedTodoArray = [...todo, newTodo];
    dispatch(todoActions.setTodo(updatedTodoArray));
    setTaskTitle("");
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
    <View style={styles.container}>
      <Text style={styles.title}>Add new task to do</Text>
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Title of the task"
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.textInput}
          />
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{
            label: "Select task priority.",
            value: null,
            color: "blue",
          }}
          onValueChange={(value) => {
            console.log(value);
            setSelectedPriority(value);
          }}
          items={priorities}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Save task" onPress={handleAddTodo} />
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: { fontSize: 19 },
  inputContainer: {
    marginVertical: 20,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  textInput: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
});
