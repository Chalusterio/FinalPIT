import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AccountDriver = () => {
  const router = useRouter();
  const [isAutoAcceptEnabled, setIsAutoAcceptEnabled] = React.useState(false);

  const handleEditProfile = () => {
    router.push('/edit-profileDriver');
  };

  const handleEmergencyContacts = () => {
    router.push('/EmeConDriver');
  };

  const handleSettings = () => {
    router.push('/SettingsDriver');
  };

  const toggleAutoAccept = () => {
    setIsAutoAcceptEnabled((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Image
            source={require('../../../../assets/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>BongBong Goylan</Text>
            <TouchableOpacity
              onPress={handleEditProfile}
              style={styles.editButton}
            >
              <MaterialIcons name="edit" size={24} color="#4B79A1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* My Account Section */}
        <Text style={styles.sectionTitle}>My Account</Text>

        <TouchableOpacity
          onPress={handleEmergencyContacts}
          style={styles.option}
        >
          <Text style={styles.optionText}>Emergency Contacts</Text>
          <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
        </TouchableOpacity>

        <View style={styles.option}>
          <View style={styles.optionLabel}>
            <Text style={styles.optionText}>Auto Accept</Text>
            <Text style={styles.optionDescription}>
              Automatically accepts bookings.
            </Text>
          </View>
          <Switch
            value={isAutoAcceptEnabled}
            onValueChange={toggleAutoAccept}
            thumbColor={isAutoAcceptEnabled ? '#4B79A1' : '#f4f3f4'}
            trackColor={{ false: '#E0E0E0', true: '#B0C4DE' }}
          />
        </View>

        {/* General Section */}
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.option}>
          <Text style={styles.optionText}>Settings</Text>
          <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 30,
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
  optionLabel: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#4B79A1',
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: 12,
    color: '#808080',
    marginTop: 2,
  },
});

export default AccountDriver;