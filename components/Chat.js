import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Chat = ({ route }) => {
  const { name, color } = route.params;
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.chatText}>Username: {name}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatText: {
    fontSize: 25,
    flex: 1,
    color: "white",
  },
});

export default Chat;
