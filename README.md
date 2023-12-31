# ChatterBox

React Native Mobile Chat App. The app provides users with a chat interface and options to share images and their location.

![ChatterBox](readme.png)

## Technologies used

- React Native
- Expo
- Google Firestore Database
- Firebase Anonymous Authentication
- Firebase Cloud Storage
- AsyncStorage
- NetInfo

## Setting up ChatterBox:

#### Development Environment Setup

- Install Node.js: Make sure you have Node.js installed on your machine. You can download it from the official website.

- Install Expo CLI: Open a terminal and run the command `npm install -g expo-cli ` to install Expo globally.

#### Database Configuration:

- Choose Firebase: For this Chat App, we're using Firebase Realtime Database to store messages. Go to the Firebase website and create a new project.

- Obtain Firebase Configuration: Inside your Firebase project, go to the project settings and copy the configuration object (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) needed for Firebase setup.

#### Clone the Project:

- Clone or download ChatterBox from the repository.

#### Install Dependencies:

- Open a terminal in the project directory and run the command `npm install` to install all required dependencies.

#### Firebase Setup:

- In the "app.js" file, replace the existing "firebaseConfig" object with the configuration object obtained from Firebase.

#### Expo Start:

- Run `npx expo start` in the terminal to start the Expo development server.

- Use Expo Go app: Install the "Expo Go" app on your Android or iOS device. Scan the QR code shown in the terminal with Expo Go to open the app on your device. You can also run the app on an emulator if you prefer such as Android Studio.

#### Database Rules (Optional):

In the Firebase console, set appropriate read/write rules for your database. For the Chat App, you can start with allowing read/write access for testing purposes. For production, consider implementing stricter rules for security.

#### Run the App:

With Expo Go or the emulator running, you can now use ChatterBox on your device. Enter your name and choose a background color to start chatting with others. The app will store and display messages in real-time using Firebase Realtime Database.
