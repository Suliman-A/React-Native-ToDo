import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const AppButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      style={[styles.btn, props.style]}
      {...props}
    >
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 20,
    backgroundColor: "#40826d",
  },
  btnText: { color: "#fff", fontSize: 19 },
});
