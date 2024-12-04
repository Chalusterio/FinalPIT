import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Account = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/edit-profile'); // Navigate to Edit Profile screen
  };

  const handleSettings = () => {
    router.push('/Settings'); // Navigate to Settings.js
  };

  return (
    <View style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        <Image
          source={require('../../../../assets/avatar.png')} // Replace with your avatar image
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Charlene Lusterio (Cha)</Text>
          <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
            <MaterialIcons name="edit" size={20} color="#4B79A1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* My Account Section */}
      <Text style={styles.sectionTitle}>My Account</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Payment Methods</Text>
        <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Saved Places</Text>
        <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
      </TouchableOpacity>

      {/* General Section */}
      <Text style={styles.sectionTitle}>General</Text>
      <TouchableOpacity style={styles.option} onPress={handleSettings}>
        <Text style={styles.optionText}>Settings</Text>
        <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAF2F8',
    borderWidth: 2,
    borderColor: '#4B79A1',
  },
  userDetails: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#EAF2F8',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B79A1',
    marginTop: 20,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3, // Adds a subtle shadow
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});

export default Account;
