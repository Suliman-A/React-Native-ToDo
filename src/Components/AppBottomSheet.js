import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TextInput, useTheme, Text } from "react-native-paper";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

const AppBottomSheet = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const bottomSheetRef = useRef(null);
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePress = useCallback(() => {
    Keyboard.dismiss();

    bottomSheetRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current.dismiss();
  }, []);

  const handleOptionSelect = useCallback(
    (option) => {
      setSelectedOption(option.label);
      props.onSelect(option);
      handleClose();
    },
    [handleClose, props]
  );

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => {
      const label = item.label || item.text;

      const isSelected =
        label === selectedOption ||
        (label === props.selectedValue && !selectedOption);

      return (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => (props.onSelect ? handleOptionSelect(item) : null)}
        >
          <View style={styles.row}>
            {item.icon && item.icon}
            <Text
              style={[styles.itemTitle, isSelected && styles.selectedItemTitle]}
            >
              {label}
            </Text>
          </View>
          {isSelected && (
            <AntDesign
              name="checkcircle"
              size={20}
              color={colors.primaryDark}
              style={styles.checkmark}
            />
          )}
        </TouchableOpacity>
      );
    },
    [handleOptionSelect, selectedOption]
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <>
      {props.customPicker ? (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          {props.customPicker}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          <TextInput
            {...props}
            mode="outlined"
            style={{}}
            editable={props.editable ? props.editable : false}
            right={
              <TextInput.Icon
                icon={"chevron-down"}
                color={colors.primary}
                onPress={handlePress}
              />
            }
          />
        </TouchableOpacity>
      )}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        index={1}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: colors.onBackground }}
        backgroundStyle={{ backgroundColor: colors.elevation.level1 }}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{props.title}</Text>
            <AntDesign
              name="close"
              size={22}
              color={colors.onBackground}
              onPress={handleClose}
            />
          </View>
          {props.commentsView && (
            <TextInput
              mode="outlined"
              // style={styles.commentInput}
              placeholder="Write a comment"
              value={props.commentText}
              onChangeText={props.setCommentText}
              onSubmitEditing={props.handleAddComment}
              render={(innerProps) => <BottomSheetTextInput {...innerProps} />}

              // onFocus={() => bottomSheetRef.current.snapToIndex(2)}
            />
          )}
          <BottomSheetFlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No options to display</Text>
            }
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      </BottomSheetModal>
    </>
  );
};

export default AppBottomSheet;

const getStyles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: theme.colors.onBackground,
      width: "70%",
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 32,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    listContentContainer: {},
    itemContainer: {
      paddingVertical: 18,
      paddingHorizontal: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: theme.colors.outline,
      borderBottomWidth: 0.2,
    },
    itemTitle: {
      fontSize: 16,
      color: theme.colors.onBackground,
    },
    selectedItemTitle: {
      fontWeight: "700",
    },
    emptyListText: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      marginVertical: 16,
    },
    commentInput: {
      // marginTop: 8,
      marginBottom: 10,
      borderRadius: 10,
      fontSize: 16,
      lineHeight: 20,
      padding: 10,
      backgroundColor: "rgba(151, 151, 151, 0.25)",
    },
  });
