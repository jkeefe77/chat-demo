//importing the two screens
import Start from "./components/Start";
import Chat from "./components/Chat";

import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

//importing react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//creating the navigator
const Stack = createNativeStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyBrA5NjFLzpsiLsJ4TNQeQjhzRqCFS4rQM",
  authDomain: "chatapp-60b0d.firebaseapp.com",
  projectId: "chatapp-60b0d",
  storageBucket: "chatapp-60b0d.appspot.com",
  messagingSenderId: "978423441043",
  appId: "1:978423441043:web:7b445112dec18b34158f66",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const App = () => {
  const connectionStatus = useNetInfo();
  useEffect(() => {
    // Check the connection status and perform actions accordingly
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db); // Disable Firestore network access
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db); // Enable Firestore network access
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
