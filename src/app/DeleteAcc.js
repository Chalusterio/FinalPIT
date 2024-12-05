import React, { useState } from 'react';
import { View, StyleSheet, Alert, Animated, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const DeleteAcc = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Animation states for buttons
  const [scaleDelete] = useState(new Animated.Value(1));
  const [scaleCancel] = useState(new Animated.Value(1));

  const handlePressInDelete = () => {
    Animated.spring(scaleDelete, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutDelete = () => {
    Animated.spring(scaleDelete, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      handleDeleteAccount();
    });
  };

  const handlePressInCancel = () => {
    Animated.spring(scaleCancel, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutCancel = () => {
    Animated.spring(scaleCancel, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      router.push('/Settings');
    });
  };

  const handleDeleteAccount = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Both password fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    Alert.alert('Success', 'Your account has been deleted successfully', [
      {
        text: 'OK',
        onPress: () => router.replace('/'), // Navigate to index.js
      },
    ]);
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

      <Animated.View style={{ transform: [{ scale: scaleDelete }] }}>
        <TouchableOpacity
          onPressIn={handlePressInDelete}
          onPressOut={handlePressOutDelete}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Confirm Delete</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleCancel }] }}>
        <TouchableOpacity
          onPressIn={handlePressInCancel}
          onPressOut={handlePressOutCancel}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    paddingHorizontal: 20,
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
    color: '#4B79A1',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  deleteButton: {
    backgroundColor: '#4B79A1',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B79A1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B79A1',
  },
});

export default DeleteAcc;
