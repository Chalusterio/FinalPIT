import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const EmergencyContacts = () => {
  const router = useRouter();
  const [scaleClose] = useState(new Animated.Value(1));
  const [scaleAdd] = useState(new Animated.Value(1));

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

  const handleClose = () => {
    router.push('/Dashboard/(tabs)/Account');
  };

  const handleAdd = () => {
    router.push('/EmergencyContactsNum'); // Navigate to EmergencyContactsNum.js
  };

  return (
    <View style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Animated.View style={{ transform: [{ scale: scaleClose }] }}>
            <TouchableOpacity
              onPressIn={() => handlePressIn(scaleClose)}
              onPressOut={() => handlePressOut(scaleClose, handleClose)}
              accessibilityLabel="Close"
              accessible
            >
              <MaterialIcons name="close" size={width * 0.07} color="#4B79A1" />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.headerText}>Emergency Contacts</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Image source={require('../../assets/people.png')} style={styles.image} />
        <Text style={styles.description}>
          Add up to 3 emergency contacts who will be 
          contacted in case of an emergency.
        </Text>
      </View>

      {/* Add Button */}
      <View style={styles.footer}>
        <Animated.View style={{ transform: [{ scale: scaleAdd }] }}>
          <TouchableOpacity
            style={styles.addButton}
            onPressIn={() => handlePressIn(scaleAdd)}
            onPressOut={() => handlePressOut(scaleAdd, handleAdd)}
          >
            <Text style={styles.addButtonText}>Add</Text>
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
    justifyContent: 'space-between',
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
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.045,
    textAlign: 'center',
    color: '#4B79A1',
    marginTop: height * 0.01,
  },
  footer: {
    padding: width * 0.05,
  },
  addButton: {
    backgroundColor: '#4B79A1',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
});

export default EmergencyContacts;
