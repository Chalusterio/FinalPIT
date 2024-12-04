import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handlePasswordRecovery = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    Alert.alert('Success', 'Password recovery link sent!', [
      {
        text: 'OK',
        onPress: () => router.push('/'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Password Recovery</Text>
      <Text style={styles.instructions}>
        Enter your email to receive a password recovery link.
      </Text>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor="#00509E"
        activeOutlineColor="#00509E"
      />
      <Button
        mode="contained"
        onPress={handlePasswordRecovery}
        style={styles.sendButton}
        labelStyle={styles.sendButtonText}
      >
        Send Recovery Link
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#EAF2F8', // Updated to match index.js background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold', // Align with index.js
    textAlign: 'center',
    marginBottom: 20,
    color: '#00509E', // Updated to match index.js
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#00509E', // Updated to match the theme
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: '#00509E', // Updated to match index.js button
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PasswordRecovery;
