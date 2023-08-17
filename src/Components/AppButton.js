import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";
import React from "react";

const AppButton = (props) => {
  return (
    <Button
      mode="contained"
      onPress={props.onPress}
      // style={styles.btn}
      style={[styles.btn, props.style]}
      labelStyle={{ fontSize: 19 }}
    >
      {props.title}
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
  },
});
