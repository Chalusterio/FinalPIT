import React, { useState } from 'react';
import { View, StyleSheet, Alert, Animated, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

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
            >
              <MaterialIcons name="close" size={28} color="#4B79A1" />
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
        >
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={[styles.option, styles.shadow]}
        >
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Delete Account</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
          </View>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: scaleLogout }] }}>
          <TouchableOpacity
            onPressIn={handlePressInLogout}
            onPressOut={handlePressOutLogout}
            style={[styles.logoutButton, styles.shadow]}
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
    backgroundColor: '#EAF2F8', // Restored background color
  },
  header: {
    height: 100, // Original header height
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 120, // Ensures content doesn't overlap with the header
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: '500',
    color: '#4B79A1',
  },
  logoutButton: {
    backgroundColor: '#4B79A1',
    borderRadius: 25,
    paddingVertical: 12,
    alignSelf: 'center',
    width: '90%',
    marginTop: 40,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Settings;
