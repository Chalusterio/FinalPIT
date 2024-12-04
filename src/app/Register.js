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

    Alert.alert("User Registration Successful", "Please login"); 
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
      />

      <TextInput
        label="Last Name"
        mode="outlined"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.registerButton}
        labelStyle={styles.registerButtonText}
        contentStyle={{ paddingVertical: 8 }}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 25,
    marginVertical: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loginText: {
    color: '#4a90e2',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Register;
