import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import ToDoItem from '../Components/ToDoItem';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons'; 

const ToDo = () => {
    const [todos, setTodos] = useState([ {title: 'First Task', id: 0} ]);
    const [todoInput, setTodoInput] = useState('');

    const handleAddTodo = () => {
        if (todoInput.trim() === '') {
            return;
        }
        const newTodo = {
            title: todoInput,
            id: todos.length + 1
        };
        setTodos([...todos, newTodo]);
        setTodoInput('');
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

  return (
    <View  style={styles.container}>
        <Text>Tasks Managment</Text>
        <View style={styles.inputContainer}>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Add a New Task"
                    value={todoInput}
                    onChangeText={setTodoInput}
                    style={styles.textInput}
                />
                <Ionicons name="add" size={24} color="black" onPress={handleAddTodo} />
            </View>
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
  )
}

export default ToDo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
      },
      inputContainer: {
        marginVertical: 20,
      },
      textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
      },
      textInput: {
        flex: 1,
      },
      iconContainer: {
        marginLeft: 5,
      },
      icon: {
        alignSelf: 'center',
      },
})