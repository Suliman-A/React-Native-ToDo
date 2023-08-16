import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons'; 

const ToDoItem = ({ todo, onUpdateTodo, onRemoveTodo }) => {
    const [comments, setComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const [newCommentText, setNewCommentText] = useState('');
    const [updatedCommentText, setUpdatedCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    
    const handleToggleEditingToDo = () => {
        if (isEditing) {
          onUpdateTodo(todo.id, updatedTitle);
        }
        setIsEditing(!isEditing);
      };
  
    const handleAddComment = () => {
      if (newCommentText.trim() === '') {
        return;
      }
      const newComment = { id: comments.length + 1, text: newCommentText };
      setComments([...comments, newComment]);
      setNewCommentText('');
    };
  
    const handleUpdateComment = (commentId) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedCommentText, isEditing: false } : comment
        )
      );
      setUpdatedCommentText('');
      setEditingCommentId(null);
    };
    
    const handleToggleEditingComment = (commentId) => {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, isEditing: true };
          }
          return { ...comment, isEditing: false };
        })
      );
      const comment = comments.find((comment) => comment.id === commentId);
      setUpdatedCommentText(comment.text);
      setEditingCommentId(commentId);
    };
  
    const handleRemoveComment = (commentId) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    };

  return (
    <View style={styles.card}>
        {isEditing ? (
        <View style={{ flex: 1, marginBottom: 20 }}>
            <View style={styles.textInputContainer}>
            <TextInput
                placeholder="Edit To Do"
                value={updatedTitle}
                onChangeText={setUpdatedTitle}
                style={[styles.textInput, { height: 30 }]}
                multiline
            />
            <Text onPress={handleToggleEditingToDo}>Save</Text>
            </View>
        </View>
        ) : (
        <View style={styles.card_header}>
          <Text style={styles.title}>{todo.title || 'Title'}</Text>
            <View style={styles.iconsContainer}>
                <FontAwesome 
                  onPress={() => setIsEditing(true)}
                  name="edit" 
                  size={20} 
                  color="black" 
                />
                <AntDesign 
                  onPress={() => onRemoveTodo(todo.id)}
                  name="delete" 
                  size={20} 
                  color="red" 
                />
            </View>
        </View>
        )}
        <>
        <Text>Comments</Text>  
        <View style={styles.commentsContainer}>
            {comments.map((comment) => (
                <View style={styles.comment} key={comment.id}>
                    {comment.isEditing && comment.id === editingCommentId ? (
                    <View style={{ flex: 1, }}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder="Edit comment"
                                value={updatedCommentText}
                                onChangeText={setUpdatedCommentText}
                                style={[styles.textInput, { height: 30 }]}
                            />
                            <Text onPress={() => handleUpdateComment(comment.id)}>Save</Text>
                        </View>
                    </View>
                    ) : (
                    <>
                      <Text>{comment.text}</Text>
                      <View style={styles.iconsContainer}>
                        <FontAwesome
                          onPress={() => handleToggleEditingComment(comment.id)}
                          name="edit" 
                          size={20} 
                          color="black" 
                        />    
                        <AntDesign 
                          onPress={() => handleRemoveComment(comment.id)}
                          name="delete" 
                          size={20} 
                          color="red" 
                        />        
                      </View>
                    </>
                    )}
                </View>
            ))}
            <View style={styles.inputContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="Add a comment"
                        value={newCommentText}
                        onChangeText={setNewCommentText}
                        style={styles.textInput}
                    />
                    <Ionicons name="add" size={24} color="black" onPress={handleAddComment} />
                </View>
            </View>
        </View>
        </>
    </View>
  )
}

export default ToDoItem

const styles = StyleSheet.create({
    card: {        
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 10,
        padding: 20,
        marginBottom: 20            
    },
    card_header: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingBottom: 20,
      marginBottom: 20,
    },
    title: {       
        fontWeight: '700',
        fontSize: 20,
        flex: 1,
        maxWidth: '60%'    
    },
    commentsContainer: { 
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 16, 
        borderRadius: 10, 
        marginTop: 5 
    },
    comment: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 14,
    },
    iconsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    inputContainer: {
        marginBottom: 10,
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
})