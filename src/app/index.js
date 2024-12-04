import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, TextInput, Button, TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your mobile number or email.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }

    router.replace('Dashboard');
  };

  const handleRegister = () => {
    router.push('Register');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/login_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text variant="headlineLarge" style={styles.title}>Welcome Back!</Text>
      <TextInput
        label="Mobile number or email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.loginButton}
        labelStyle={styles.loginButtonText}
      >
        Log In
      </Button>
      <TouchableRipple onPress={() => router.push('PasswordRecovery')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableRipple>
      <TouchableRipple onPress={handleRegister}>
        <Text style={styles.registerButtonText}>New Here? Register</Text>
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
  logo: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4B79A1',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#4B79A1',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#4B79A1',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  registerButtonText: {
    color: '#4B79A1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LogIn;
