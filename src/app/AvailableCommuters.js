import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const AvailableCommuters = ({ navigation }) => {
  // Commuter locations with IDs 1 through 7
  const commuterLocations = [
    { id: 1, name: 'SM Downtown', latitude: 8.484948866018328, longitude: 124.65444963316311 },
    { id: 2, name: 'Limketkai Mall', latitude: 8.481976515001733, longitude: 124.65707902144969 },
    { id: 3, name: 'Ayala', latitude: 8.48522793502486, longitude: 124.65108093154014 },
    { id: 4, name: 'Cogon Public Market', latitude: 8.476976497704133, longitude: 124.6514986855942 },
    { id: 5, name: 'USTP CDO', latitude: 8.484785418014178, longitude: 124.65660503956367 },
    { id: 6, name: 'Lapasan', latitude: 8.4833, longitude: 124.6617 },
    { id: 7, name: 'Final Destination', latitude: 8.47954, longitude: 124.67299 },
  ];

  // Route coordinates connecting all IDs
  const routeCoordinates = [
    { latitude: 8.484, longitude: 124.654 }, // id:1
    { latitude: 8.4819, longitude: 124.657 }, // id:2
    { latitude: 8.485, longitude: 124.651 }, // id:3
    { latitude: 8.476, longitude: 124.651 }, // id:4
    { latitude: 8.484, longitude: 124.656 }, // id:5
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
        {commuterLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            onPress={() => handleMarkerPress(location)}
          >
            <Image
              source={
                location.id === 7
                  ? require('../../assets/bus.png') 
                  : require('../../assets/location.png') 
              }
              style={styles.markerImage}
            />
          </Marker>
        ))}

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