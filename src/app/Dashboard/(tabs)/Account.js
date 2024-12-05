import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Account = () => {
  const router = useRouter();

  const [scaleEdit] = React.useState(new Animated.Value(1));
  const [scaleSettings] = React.useState(new Animated.Value(1));
  const [scalePayment] = React.useState(new Animated.Value(1));
  const [scalePlaces] = React.useState(new Animated.Value(1));

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

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          source={require('../../../../assets/avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Charlene Lusterio (Cha)</Text>
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
          onPressOut={() => handlePressOut(scalePayment, () => {})}
          style={styles.option}
        >
          <Text style={styles.optionText}>Payment Methods</Text>
          <MaterialIcons name="chevron-right" size={24} color="#4B79A1" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: scalePlaces }] }}>
        <TouchableOpacity
          onPressIn={() => handlePressIn(scalePlaces)}
          onPressOut={() => handlePressOut(scalePlaces, () => {})}
          style={styles.option}
        >
          <Text style={styles.optionText}>Saved Places</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 20,
    paddingTop: 50, // Added to push content lower
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
