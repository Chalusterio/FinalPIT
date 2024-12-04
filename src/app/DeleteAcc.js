import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const DeleteAcc = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDeleteAccount = () => {
    // Validate input
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Both password fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Simulate account deletion logic (e.g., API call)
    Alert.alert('Success', 'Your account has been deleted successfully');
    router.replace('/'); // Redirect to index.js after account deletion
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Delete Account</Text>
      <Text style={styles.messageText}>
        Please enter your password to confirm account deletion. This action cannot be undone.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button
        mode="contained"
        onPress={handleDeleteAccount}
        style={styles.deleteButton}
        labelStyle={styles.deleteButtonText}
      >
        Confirm Delete
      </Button>
      <Button
        mode="text"
        onPress={() => router.back()} // Go back to the previous screen
        labelStyle={styles.cancelButtonText}
      >
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4B79A1',
    marginBottom: 20,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  deleteButton: {
    backgroundColor: '#4B79A1',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#4B79A1',
  },
});

export default DeleteAcc;
