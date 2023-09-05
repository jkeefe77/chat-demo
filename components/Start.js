import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [backgroundColor, setbackgroundColor] = useState("");
  const [name, setName] = useState("");
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Navigate to the "Chat" screen with the user's name and selected color
        navigation.navigate("Chat", {
          name: name,
          backgroundColor: backgroundColor,
          _id: result.user.uid,
        });
        Alert.alert("Signed in Successfully");
      })
      .catch((error) => {
        Alert.alert("unable to sign in, try again later");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/Background-Image.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Chat App!</Text>
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder="Type your username here"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          {/* User selects backgroundcolor */}
          <Text style={styles.backgroundSelect}>Choose Background Color</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#090C08" }]}
              onPress={() => setbackgroundColor("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#474056" }]}
              onPress={() => setbackgroundColor("#474056")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#8A95A5" }]}
              onPress={() => setbackgroundColor("#8A95A5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setbackgroundColor("#B9C6AE")}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Let's Chat!</Text>
          </TouchableOpacity>
        </View>
      </View>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
  },
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 45,
    fontWeight: "600",
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#757083",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  radioButton: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  input: {
    height: 40,
    width: "88%",
    margin: 12,
    borderWidth: 3,
    padding: 10,
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    opacity: 0.5,
    backgroundColor: "white",
  },

  backgroundSelect: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
    opacity: 5,
  },
});

export default Start;
