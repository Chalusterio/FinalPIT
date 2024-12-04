import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: 'Charlene Lusterio (Cha)',
    phone: '9979617157',
    email: 'charlenelusterio@gmail.com',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSave = () => {
    console.log('Profile saved:', userData, 'Profile Picture:', profilePicture);
    setIsEditing(false);
    router.back();
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleImageSelection = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square image crop
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri; // Get URI from assets
        console.log('Selected Image:', selectedImageUri); // Debug log to confirm URI
        setProfilePicture(selectedImageUri); // Set URI to state
        Alert.alert('Success', 'Image selected successfully.');
      } else {
        Alert.alert('Cancelled', 'No image was selected.');
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
      Alert.alert('Error', 'An error occurred while selecting the image.');
    }
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
        <View style={styles.backgroundCircle}></View>
        <View style={styles.backgroundCircle2}></View>
        <TouchableOpacity onPress={handleImageSelection} disabled={!isEditing}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('../../assets/avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        {isEditing && <Text style={styles.changeText}>Tap to change photo</Text>}
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetails}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          editable={isEditing}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={userData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          editable={isEditing}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          editable={isEditing}
          keyboardType="email-address"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FBFC',
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: 'linear-gradient(90deg, #4B79A1, #283E51)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6,
    },
    editText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#4B79A1',
    },
    banner: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
      position: 'relative',
      backgroundColor: '#4B79A1',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 10,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor: '#FFFFFF',
      backgroundColor: '#E5E5E5',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    changeText: {
      color: '#FFFFFF',
      fontSize: 16,
      marginTop: 10,
      fontWeight: '500',
    },
    profileDetails: {
      paddingHorizontal: 20,
      marginTop: 30,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      paddingVertical: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#4B79A1',
      marginBottom: 8,
    },
    input: {
      fontSize: 16,
      backgroundColor: '#F7F9FC',
      padding: 12,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
      color: '#333',
    },
  });
  

export default EditProfile;
