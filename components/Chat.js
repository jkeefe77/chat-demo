//components/Chat.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ db, route, navigation, storage }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // Set the initial connection status

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      if (unsubscribeNetInfo) unsubscribeNetInfo();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name }); //sets Username to title on use of component

    if (isConnected) {
      const unsubMessages = onSnapshot(
        collection(db, "messages"),
        async (querySnapshot) => {
          const newMessages = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              _id: doc.id,
              createdAt: data.createdAt.toDate(),
            };
          });

          // Sort messages by createdAt in descending order
          newMessages.sort((a, b) => b.createdAt - a.createdAt);
          setMessages(newMessages);

          // Cache messages in AsyncStorage
          try {
            await AsyncStorage.setItem(
              "cachedMessages",
              JSON.stringify(newMessages)
            );
          } catch (error) {
            console.log(error.message);
          }
        }
      );

      return () => {
        if (unsubMessages) unsubMessages();
      };
    } else {
      // Load cached messages from AsyncStorage
      AsyncStorage.getItem("cachedMessages")
        .then((cachedMessages) => {
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [db, isConnected]);

  const onSend = async (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  //Will send current location in the chat
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
