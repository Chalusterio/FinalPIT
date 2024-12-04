import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const handleRegister = () => {
    // Validation for empty fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    // Validation for matching passwords
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    Alert.alert('User Registration Successful', 'Please login');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Create Account</Text>

      <TextInput
        label="First Name"
        mode="outlined"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        outlineColor="#00509E"
        activeOutlineColor="#00509E"
      />

      <TextInput
        label="Last Name"
        mode="outlined"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        outlineColor="#00509E"
        activeOutlineColor="#00509E"
      />

      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        outlineColor="#00509E"
        activeOutlineColor="#00509E"
      />

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor="#00509E"
        activeOutlineColor="#00509E"
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        outlineColor="#00509E"
        activeOutlineColor="#00509E"
      />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        outlineColor="#00509E"
        activeOutlineColor="#00509E"
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.registerButton}
        labelStyle={styles.registerButtonText}
      >
        Register
      </Button>

      <TouchableRipple onPress={() => router.push('/')}>
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableRipple>
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
    color: '#00509E',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  registerButton: {
    backgroundColor: '#00509E',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#00509E',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Register;
