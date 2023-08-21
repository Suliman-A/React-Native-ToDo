import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../Redux/Slices/UserSlice";
import { TextInput } from "react-native-paper";
import AppButton from "../Components/AppButton";
import Container from "../Components/Container";
import Storage from "../Services/Storage";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const userInfo = {
      username: username,
      password: password,
    };

    if (!username || !password) {
      Alert.alert("Invalid username or password");
    } else {
      try {
        const storedUsers = await Storage.getItem("users");
        let users = storedUsers ? storedUsers : [];
        console.log(users);

        // Check if user already exists
        const existingUser = users.find(
          (user) => user.username === userInfo.username
        );

        if (existingUser) {
          // User already exists, check password
          if (existingUser.password === userInfo.password) {
            // Password matches, log them in
            dispatch(userActions.setUserInfo(userInfo));
          } else {
            Alert.alert("Invalid password");
          }
        } else {
          // User doesn't exist, add new user
          users.push(userInfo);
          await Storage.setItem("users", users);
          dispatch(userActions.setUserInfo(userInfo));
        }
      } catch (error) {
        console.error("Error handling login: ", error);
      }
    }
  };

  return (
    <Container scrollable style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          mode="outlined"
          style={styles.TextInput}
          label={"Username"}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          mode="outlined"
          style={styles.TextInput}
          label={"Password"}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <AppButton title="Login" onPress={login} />
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  inputView: {
    width: "90%",
    marginBottom: 20,
  },
});
