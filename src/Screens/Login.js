import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../Redux/Slices/UserSlice";
import { TextInput } from "react-native-paper";
import AppButton from "../Components/AppButton";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const userInfo = {
      username: username,
      password: password,
    };

    if (!username || !password) {
      Alert.alert("Invalid username or password");
    } else {
      dispatch(userActions.setUserInfo(userInfo));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  inputView: {
    width: "90%",
    marginBottom: 20,
  },
});
