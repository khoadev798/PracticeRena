import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebase.js";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
  TextInput,
  ToastAndroid,
  YellowBox,
} from "react-native";
import FormInput from "../components/FormInput.js";

export const UpdatePassword = () => {
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  return (
    <View>
      <Text>UPDATE ACCOUNT PASSWORD</Text>
      <FormInput></FormInput>
    </View>
  );
};
