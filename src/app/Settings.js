import React, { useState } from 'react';
import { View, StyleSheet, Alert, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Settings = () => {
  const router = useRouter();

  // Animation states for buttons
  const [scaleClose] = useState(new Animated.Value(1));
  const [scaleLogout] = useState(new Animated.Value(1));

  const handlePressInClose = () => {
    Animated.spring(scaleClose, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutClose = () => {
    Animated.spring(scaleClose, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      router.push('/Dashboard/(tabs)/Account');
    });
  };

  const handlePressInLogout = () => {
    Animated.spring(scaleLogout, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutLogout = () => {
    Animated.spring(scaleLogout, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      Alert.alert('Logout', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => router.replace('/') },
      ]);
    });
  };

  const handleChangePassword = () => router.push('/ChangePass');
  const handleDeleteAccount = () => router.push('/DeleteAcc');

  return (
    <View style={styles.background}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Animated.View style={{ transform: [{ scale: scaleClose }] }}>
            <TouchableOpacity
              onPressIn={handlePressInClose}
              onPressOut={handlePressOutClose}
              accessibilityLabel="Close settings"
              accessible
            >
              <MaterialIcons name="close" size={width * 0.07} color="#4B79A1" />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.headerText}>Settings</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={handleChangePassword}
          style={[styles.option, styles.shadow]}
          accessibilityLabel="Change your password"
          accessible
        >
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={width * 0.06} color="#4B79A1" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={[styles.option, styles.shadow]}
          accessibilityLabel="Delete your account"
          accessible
        >
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Delete Account</Text>
            <MaterialIcons name="chevron-right" size={width * 0.06} color="#4B79A1" />
          </View>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: scaleLogout }] }}>
          <TouchableOpacity
            onPressIn={handlePressInLogout}
            onPressOut={handlePressOutLogout}
            style={[styles.logoutButton, styles.shadow]}
            accessibilityLabel="Log out of the application"
            accessible
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  header: {
    height: height * 0.12, // Responsive height
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
  },
  headerText: {
    textAlign: 'center',
    fontSize: width * 0.06, // Responsive font size
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02, // Reduced top padding to move buttons closer to the header
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.03,
    padding: height * 0.02,
    marginBottom: height * 0.02, // Adjusted spacing between options
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: width * 0.045,
    fontWeight: '500',
    color: '#4B79A1',
  },
  logoutButton: {
    backgroundColor: '#4B79A1',
    borderRadius: width * 0.05,
    paddingVertical: height * 0.015,
    alignSelf: 'center',
    width: '90%',
    marginTop: height * 0.03, // Spacing for the logout button
  },
  logoutButtonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});



export default Settings;
