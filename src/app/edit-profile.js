import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const EditProfile = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: 'Charlene Lusterio (Cha)',
    phone: '9979617157',
    email: 'charlenelusterio@gmail.com',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log('Profile saved:', userData);
    setIsEditing(false);
    router.back();
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    console.log('User logged out');
    router.replace('/');
  };

  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }));
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={isEditing ? handleSave : handleEditToggle}>
          <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Banner */}
      <View style={styles.banner}>
        <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetails}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          editable={isEditing}
          placeholder="Name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={userData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          editable={isEditing}
          placeholder="Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={userData.gender}
            onValueChange={(value) => handleInputChange('gender', value)}
            enabled={isEditing}
            style={{ color: userData.gender ? '#000' : '#999' }} // Adjust placeholder color
          >
            {!userData.gender && (
              <Picker.Item label="Please select your gender" value="" enabled={false} />
            )}
            <Picker.Item label="Woman" value="woman" />
            <Picker.Item label="Man" value="man" />
            <Picker.Item label="Non-binary" value="non-binary" />
            <Picker.Item label="Prefer not to disclose" value="prefer-not-to-disclose" />
          </Picker>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          editable={isEditing}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#00509E',
  },
  editText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00509E',
  },
  banner: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
  },
  profileDetails: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00509E',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#00509E',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#FF3B3B',
  },
  logoutText: {
    color: '#FF3B3B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
