import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { auth } from '../../../../src/config/firebaseConfig'; // Firebase Auth
import { getDoc, doc } from 'firebase/firestore'; // Firestore
import { db } from '../../../../src/config/firebaseConfig'; // Firestore Config

const { width } = Dimensions.get('window');

const Account = () => {
  const router = useRouter();
  const [scaleEdit] = useState(new Animated.Value(1));
  const [scaleSettings] = useState(new Animated.Value(1));
  const [scalePayment] = useState(new Animated.Value(1));
  const [scalePlaces] = useState(new Animated.Value(1));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Fetch user details from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get currently authenticated user
        if (user) {
          const userDocRef = doc(db, 'users', user.uid); // Reference to the user's document
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
          } else {
            console.error('User document does not exist.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleSettings = () => {
    router.push('/Settings');
  };

  const handlePaymentMethods = () => {
    router.push('/PaymentMed');
  };

  const handleSavedPlaces = () => {
    router.push('/EmergencyContacts');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image
            source={require('../../../../assets/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            {/* Display first and last name dynamically */}
            <Text style={styles.userName}>
              {firstName} {lastName}
            </Text>
            <Animated.View style={{ transform: [{ scale: scaleEdit }] }}>
              <TouchableOpacity
                onPressIn={() => handlePressIn(scaleEdit)}
                onPressOut={() => handlePressOut(scaleEdit, handleEditProfile)}
                style={styles.editButton}
              >
                <MaterialIcons name="edit" size={20} color="#4B79A1" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Account</Text>
        <Animated.View style={{ transform: [{ scale: scalePayment }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scalePayment)}
            onPressOut={() => handlePressOut(scalePayment, handlePaymentMethods)}
            style={styles.option}
          >
            <Text style={styles.optionText}>Payment Methods</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scalePlaces }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scalePlaces)}
            onPressOut={() => handlePressOut(scalePlaces, handleSavedPlaces)}
            style={styles.option}
          >
            <Text style={styles.optionText}>Emergency Contacts</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.sectionTitle}>General</Text>
        <Animated.View style={{ transform: [{ scale: scaleSettings }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scaleSettings)}
            onPressOut={() => handlePressOut(scaleSettings, handleSettings)}
            style={styles.option}
          >
            <Text style={styles.optionText}>Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingTop: 50,
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
    color: '#4B79A1',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionText: {
    fontSize: 16,
    color: '#4B79A1',
    fontWeight: '500',
  },
});

export default Account;
