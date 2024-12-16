import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const AvailableCommuters = ({ navigation }) => {
  // Commuter locations with IDs 1 through 7
  const commuterLocations = [
    { id: 1, name: 'Bolonsiri Rd', latitude: 8.482, longitude: 124.641 },
    { id: 2, name: 'Cogon Public Market', latitude: 8.4788, longitude: 124.6327 },
    { id: 3, name: 'Centrio Mall', latitude: 8.479, longitude: 124.645 },
    { id: 4, name: 'Jollibee Agora Market', latitude: 8.485, longitude: 124.652 },
    { id: 5, name: 'Puntod', latitude: 8.471, longitude: 124.657 },
    { id: 6, name: 'Lapasan', latitude: 8.4833, longitude: 124.6617 },
    { id: 7, name: 'Final Destination', latitude: 8.47954, longitude: 124.67299 },
  ];

  // Route coordinates connecting all IDs
  const routeCoordinates = [
    { latitude: 8.482, longitude: 124.641 }, // id:1
    { latitude: 8.4788, longitude: 124.6327 }, // id:2
    { latitude: 8.479, longitude: 124.645 }, // id:3
    { latitude: 8.485, longitude: 124.652 }, // id:4
    { latitude: 8.471, longitude: 124.657 }, // id:5
    { latitude: 8.4833, longitude: 124.6617 }, // id:6
    { latitude: 8.47954, longitude: 124.67299 }, // id:7
  ];

  const handleMarkerPress = (location) => {
    navigation.navigate('LocationDetails', { location }); // Navigate and pass location details
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 8.48,
          longitude: 124.655,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Markers for all commuter locations */}
        {commuterLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            onPress={() => handleMarkerPress(location)} // Pass location details on marker click
          >
            <Image
              source={
                location.id === 7
                  ? require('../../assets/bus.png') // Custom bus icon for the final destination
                  : require('../../assets/location.png') // Default icon for other locations
              }
              style={styles.markerImage}
            />
          </Marker>
        ))}

        {/* Polyline connecting all locations */}
        <Polyline coordinates={routeCoordinates} strokeColor="green" strokeWidth={5} />
      </MapView>
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
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default AvailableCommuters;
