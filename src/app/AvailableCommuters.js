import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const AvailableCommuters = () => {
  const navigation = useNavigation();

  // Sample commuter locations
  const commuterLocations = [
    { id: 1, name: 'Bolonsiri Rd', latitude: 8.482, longitude: 124.641 },
    { id: 2, name: 'Cogon Public Market', latitude: 8.480, longitude: 124.645 },
    { id: 3, name: 'Centrio Mall', latitude: 8.479, longitude: 124.645 },
    { id: 4, name: 'Jollibee Agora Market', latitude: 8.485, longitude: 124.652 },
    { id: 5, name: 'Puntod', latitude: 8.471, longitude: 124.657 },
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
          <Text
            key={location.id}
            style={styles.listItem}
            onPress={() => handleMarkerPress(location)}
          >
            📍 {location.name}
          </Text>
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
    fontSize: 16,
    marginVertical: 5,
  },
});

export default AvailableCommuters;
