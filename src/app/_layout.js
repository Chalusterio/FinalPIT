import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
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
    </Stack>
  );
};

export default Layout;
