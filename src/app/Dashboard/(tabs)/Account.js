import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Account = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/edit-profile'); // Ensure this route is correctly set up
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
            <MaterialIcons name="edit" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* My Account Section */}
      <Text style={styles.sectionTitle}>My Account</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Payment Methods</Text>
        <MaterialIcons name="chevron-right" size={24} color="#808080" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Saved Places</Text>
        <MaterialIcons name="chevron-right" size={24} color="#808080" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Emergency Contacts</Text>
        <MaterialIcons name="chevron-right" size={24} color="#808080" />
      </TouchableOpacity>

      {/* General Section */}
      <Text style={styles.sectionTitle}>General</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Help Center</Text>
        <MaterialIcons name="chevron-right" size={24} color="#808080" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Settings</Text>
        <MaterialIcons name="chevron-right" size={24} color="#808080" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F5F5F5',
  },
  userDetails: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  editButton: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Account;
