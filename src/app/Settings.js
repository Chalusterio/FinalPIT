import React from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text, TouchableRipple, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Settings = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/Dashboard/(tabs)/Account'); // Navigate to Account.js
  };

  const handleChangePassword = () => {
    router.push('/ChangePass'); // Navigate to ChangePass.js
  };

  const handleDeleteAccount = () => {
    router.push('/DeleteAcc'); // Navigate to DeleteAcc.js
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => router.replace('/') }, // Navigate to index.js
      ]
    );
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      }}
      style={styles.background}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons
            name="close"
            size={28}
            color="#4B79A1"
            onPress={handleClose}
          />
          <Text style={styles.headerText}>Settings</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.overlay}>
        <TouchableRipple
          onPress={handleChangePassword}
          style={[styles.option, styles.shadow]}
        >
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={handleDeleteAccount}
          style={[styles.option, styles.shadow]}
        >
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Delete Account</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
          </View>
        </TouchableRipple>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, styles.shadow]}
          labelStyle={styles.logoutButtonText}
        >
          Log Out
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    height: 100, // Taller header
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: 10, // Adds spacing below the content
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingTop: 120, // Ensures content doesn't overlap with the taller header
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
  },
});

export default Settings;
