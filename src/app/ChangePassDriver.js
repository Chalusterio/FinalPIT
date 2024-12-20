import React, { useState } from 'react';
import { View, StyleSheet, Alert, Animated, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const ChangePassDriver = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Animation states for buttons
  const [scaleSubmit] = useState(new Animated.Value(1));
  const [scaleCancel] = useState(new Animated.Value(1));

  const handlePressInSubmit = () => {
    Animated.spring(scaleSubmit, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutSubmit = () => {
    Animated.spring(scaleSubmit, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      handleSubmit();
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
      router.back();
    });
  };

  const handleSubmit = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password must match');
      return;
    }

    Alert.alert('Success', 'Your password has been changed successfully');
    router.replace('/Settings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Animated.View style={{ transform: [{ scale: scaleSubmit }] }}>
        <TouchableOpacity
          onPressIn={handlePressInSubmit}
          onPressOut={handlePressOutSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
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
    paddingHorizontal: width * 0.05, // Responsive padding
    backgroundColor: '#EAF2F8',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: width * 0.06, // Responsive font size
    fontWeight: '700',
    color: '#4B79A1',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: height * 0.02,
    fontSize: width * 0.04, // Responsive font size
    marginBottom: height * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  submitButton: {
    backgroundColor: '#4B79A1',
    borderRadius: width * 0.05,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    marginBottom: height * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.05,
    paddingVertical: height * 0.015,
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
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
    color: '#4B79A1',
  },
});

export default ChangePassDriver;
