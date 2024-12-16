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
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth
import { doc, getDoc } from 'firebase/firestore'; // Firestore
import { auth, db } from '../config/firebaseConfig'; // Firebase Config

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
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

  const handleLogin = async () => {
    // Regex for email and numeric-only input (mobile number)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }

    try {
      // Firebase Authentication logic
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check for specific credentials
      if (email === 'Depz12@gmail.com' && password === 'Depz12') {
        Alert.alert('Login Successful', 'Redirecting to DashboardDriver');
        router.replace('/DashboardDriver'); // Redirect to DashboardDriver
        return;
      }

      // Fetch user's first and last name from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { firstName, lastName } = userDoc.data();
        Alert.alert('Login Successful', `Welcome back, ${firstName} ${lastName}!`);
        router.replace('/Dashboard'); // Redirect to Dashboard after successful login
      } else {
        Alert.alert('Login Failed', 'User data not found in the database.');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    }
  };

  const handleRegister = () => {
    router.push('Register'); // Navigate to the Register screen
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
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, styles.passwordInput]}
          outlineColor="#4B79A1"
          activeOutlineColor="#4B79A1"
        />
        {password.trim().length > 0 && ( // Show the icon only if there's input
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#4B79A1"
            />
          </TouchableOpacity>
        )}
      </View>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
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