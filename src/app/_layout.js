import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const Layout = () => {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = new Animated.Value(0); // Initial opacity value
  const scaleAnim = new Animated.Value(0.8); // Initial scale value

  useEffect(() => {
    // Start fade-in and scale-up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Final opacity value
        duration: 1500, // Animation duration in milliseconds
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Final scale value
        duration: 1500, // Animation duration in milliseconds
        useNativeDriver: true,
      }),
    ]).start();

    // Timer to hide splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require('../../assets/login_logo.png')} // Replace with your logo path
          style={[
            styles.splashLogo,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }, // Apply animated styles
          ]}
        />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide headers globally
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="Register" options={{ title: 'Register' }} />
      <Stack.Screen name="UserProfile" options={{ title: 'User Profile' }} />
      <Stack.Screen name="PasswordRecovery" options={{ title: 'Password Recovery' }} />
      <Stack.Screen name="Dashboard/(tabs)" options={{ title: 'Home' }} />
      <Stack.Screen
        name="AvailableCommuters"
        options={{
          title: 'Available Commuters',
          headerShown: true, // Show header for this screen if needed
        }}
      />
      <Stack.Screen
        name="LocationDetails"
        options={{
          title: 'Location Details',
          headerShown: true, // Show header for this screen if needed
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F8', // Background color for the splash screen
  },
  splashLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Layout;
