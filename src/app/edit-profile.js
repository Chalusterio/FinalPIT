import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image, Alert, TextInput, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../config/firebaseConfig'; // Ensure proper Firebase config
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const { width, height } = Dimensions.get('window');

const EditProfile = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [scaleClose] = useState(new Animated.Value(1));
  const [scaleSave] = useState(new Animated.Value(1));

  const userId = auth.currentUser?.uid; // Get current user ID
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            fullName: `${data.firstName} ${data.lastName}`,
            phone: data.phone,
            email: data.email,
          });
          if (data.profilePicture) {
            setProfilePicture(data.profilePicture);
          }
        } else {
          console.warn('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale, action) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      action();
    });
  };

  const handleSave = async () => {
    if (!userId) return;

    try {
      const userRef = doc(db, 'users', userId);
      const updates = {
        phone: userData.phone,
        email: userData.email,
      };

      // If profile picture was changed, upload it
      if (profilePicture && !profilePicture.startsWith('https://')) {
        const storageRef = ref(storage, `profilePictures/${userId}`);
        const response = await fetch(profilePicture);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        updates.profilePicture = downloadURL;
      }

      await updateDoc(userRef, updates);
      Alert.alert('Success', 'Profile updated successfully.');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    }
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensure this line is updated
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        setProfilePicture(selectedImageUri);
        Alert.alert('Success', 'Image selected successfully.');
      } else {
        Alert.alert('Cancelled', 'No image was selected.');
      }
    } catch (error) {
      console.error('Image Selection Error:', error); // Log the error
      Alert.alert('Error', 'An error occurred while selecting the image.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleClose }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scaleClose)}
            onPressOut={() => handlePressOut(scaleClose, () => router.back())}
          >
            <MaterialIcons name="close" size={width * 0.07} color="#4B79A1" />
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.headerText}>{isEditing ? 'Edit Profile' : 'Profile'}</Text>
        <Animated.View style={{ transform: [{ scale: scaleSave }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scaleSave)}
            onPressOut={() =>
              handlePressOut(scaleSave, isEditing ? handleSave : handleEditToggle)
            }
          >
            <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Profile Banner */}
      <View style={styles.banner}>
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
          value={userData.fullName}
          onChangeText={(text) => handleInputChange('fullName', text)}
          editable={false}
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
    backgroundColor: '#EAF2F8',
  },
  header: {
    height: height * 0.12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#4B79A1',
    textAlign: 'center',
    flex: 1,
  },
  editText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#4B79A1',
  },
  banner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.05,
    backgroundColor: '#4B79A1',
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#E5E5E5',
  },
  changeText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    marginTop: height * 0.01,
    fontWeight: '500',
  },
  profileDetails: {
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.03,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#4B79A1',
    marginBottom: height * 0.01,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.03,
    padding: height * 0.02,
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default EditProfile;
