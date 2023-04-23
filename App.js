import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/navigation/Routes';
import FlashMessage from "react-native-flash-message"

const App = () => {
  return (
    <View style={styles.container}>
      <Routes />
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
