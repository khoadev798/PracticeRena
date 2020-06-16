import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "bold",
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    color: "#b50090",
    fontSize: 16,
    borderColor: "red",
    borderRadius: 0,
    borderWidth: 1,
  },
});
