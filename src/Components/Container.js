import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = ({ children, scrollable, style, refresh, noBottomInset }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  const edges = ["left", "right", "bottom"];

  if (noBottomInset) {
    const index = edges.indexOf("bottom");
    if (index > -1) {
      edges.splice(index, 1);
    }
  }

  return (
    <SafeAreaView {...{ edges }} style={{ ...styles.container }}>
      {scrollable ? (
        <KeyboardAwareScrollView
          refreshControl={refresh}
          enableOnAndroid={true}
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.background,
            ...styles.spacing,
            ...style,
          }}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={[
            styles.container,
            styles.spacing,
            { backgroundColor: colors.background },
            style,
          ]}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    spacing: {
      padding: 20,
      paddingBottom: 0,
    },
  });

export default Container;
