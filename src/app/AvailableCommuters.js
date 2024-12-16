import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AvailableCommuters = () => {
  const navigation = useNavigation();

  // Sample commuter locations with booking details
  const commuterLocations = [
    {
      id: 1,
      name: 'Bolonsiri Rd',
      latitude: 8.482,
      longitude: 124.641,
      bookings: ['Juan Dela Cruz', 'Maria Clara'],
    },
    {
      id: 2,
      name: 'Cogon Public Market',
      latitude: 8.480,
      longitude: 124.645,
      bookings: ['Jose Rizal', 'Andres Bonifacio'],
    },
    {
      id: 3,
      name: 'Centrio Mall',
      latitude: 8.479,
      longitude: 124.645,
      bookings: ['Emilio Aguinaldo'],
    },
    {
      id: 4,
      name: 'Jollibee Agora Market',
      latitude: 8.485,
      longitude: 124.652,
      bookings: [],
    },
    {
      id: 5,
      name: 'Puntod',
      latitude: 8.471,
      longitude: 124.657,
      bookings: ['Gregoria de Jesus'],
    },
  ];

  const handleMarkerPress = (location) => {
    navigation.navigate('LocationDetails', { location });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 8.479,
          longitude: 124.645,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {commuterLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            onPress={() => handleMarkerPress(location)}
          />
        ))}
      </MapView>
      <View style={styles.list}>
        {commuterLocations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={styles.listItem}
            onPress={() => handleMarkerPress(location)}
          >
            <EvilIcons name="location" size={24} color="#4B79A1" />
            <Text style={styles.listItemText}>{location.name}</Text>
            <Ionicons name="man-outline" size={24} color="#4B79A1" style={styles.iconSpacing} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  list: {
    backgroundColor: '#fff',
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1, // Ensures proper spacing
  },
  iconSpacing: {
    marginLeft: 10, // Adds space between the text and the icon
  },
});

export default AvailableCommuters;
