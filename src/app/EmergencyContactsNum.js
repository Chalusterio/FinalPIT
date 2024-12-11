import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const EmergencyContactsNum = () => {
  const router = useRouter();
  const [contactName, setContactName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSave = () => {
    if (!contactName || !mobileNumber) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }

    router.push({
      pathname: '/EmergencyContacts',
      params: { name: contactName, mobile: mobileNumber },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name of Contact Person"
        value={contactName}
        onChangeText={setContactName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B79A1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: width * 0.045,
  },
  saveButton: {
    backgroundColor: '#4B79A1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
});

export default EmergencyContactsNum;
