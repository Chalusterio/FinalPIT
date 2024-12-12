import React, { useState } from 'react';
import { View, StyleSheet, Alert, Animated, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase auth method
import { auth } from '../config/firebaseConfig'; // Import Firebase configuration

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [scale] = useState(new Animated.Value(1)); // Initial scale value
  const router = useRouter();

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // Shrinks the button slightly
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Returns button to original size
      useNativeDriver: true,
    }).start(() => {
      handlePasswordRecovery(); // Triggers the recovery logic after animation
    });
  };

  const handlePasswordRecovery = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password recovery link sent!', [
        {
          text: 'OK',
          onPress: () => router.push('/'), // Redirect to home or login screen
        },
      ]);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password recovery link. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Password Recovery
      </Text>
      <Text style={styles.instructions}>
        Enter your email address to receive a password recovery link.
      </Text>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>Send Recovery Link</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#EAF2F8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B79A1',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4B79A1',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: '#4B79A1',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PasswordRecovery;
