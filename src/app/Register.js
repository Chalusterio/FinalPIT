import React, { useState } from 'react';
import { View, StyleSheet, Alert, Animated, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig'; // Import Firebase config
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // State for phone number
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [scaleRegister] = useState(new Animated.Value(1)); // Scaling for the Register button
  const [scaleLogin] = useState(new Animated.Value(1)); // Scaling for the Log In link
  const router = useRouter();

  const handlePressInRegister = () => {
    Animated.spring(scaleRegister, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutRegister = () => {
    Animated.spring(scaleRegister, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      handleRegister(); // Triggers the registration logic after animation
    });
  };

  const handlePressInLogin = () => {
    Animated.spring(scaleLogin, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutLogin = () => {
    Animated.spring(scaleLogin, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      router.push('/'); // Navigate to the login screen after animation
    });
  };

  const handleRegister = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch all user documents to determine the next userID
      const usersCollection = collection(db, 'users');
      const snapshot = await getDocs(usersCollection);
      const userCount = snapshot.size + 1; // Increment user count to generate new userID

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        userID: userCount,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        phone: phone, // Save phone number
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/'); // Redirect to login screen
    } catch (err) {
      console.error('Registration error:', err.message);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Create Account
      </Text>

      <TextInput
        label="First Name"
        mode="outlined"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />

      <TextInput
        label="Last Name"
        mode="outlined"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />

      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />

      <TextInput
        label="Phone Number"
        mode="outlined"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
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

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        outlineColor="#4B79A1"
        activeOutlineColor="#4B79A1"
      />

      <Animated.View style={{ transform: [{ scale: scaleRegister }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressInRegister}
          onPressOut={handlePressOutRegister}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleLogin }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressInLogin}
          onPressOut={handlePressOutLogin}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>Already have an account? Log In</Text>
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
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  registerButton: {
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
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginText: {
    color: '#4B79A1',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Register;
