import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [scale] = useState(new Animated.Value(1)); // Initial scale value
  const router = useRouter();

  const handleLoginPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // Slightly shrink the button
      useNativeDriver: true,
    }).start();
  };

  const handleLoginPressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Return to original size
      useNativeDriver: true,
    }).start(() => {
      handleLogin(); // Trigger the login logic after the animation
    });
  };

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
      <Text variant="headlineLarge" style={styles.title}>
        Welcome Back!
      </Text>
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
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handleLoginPressIn}
          onPressOut={handleLoginPressOut}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={() => router.push('PasswordRecovery')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerButtonText}>New Here? Register</Text>
      </TouchableOpacity>
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
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    paddingVertical: 5,
  },
  registerButtonText: {
    color: '#4B79A1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 5,
  },
});

export default LogIn;
