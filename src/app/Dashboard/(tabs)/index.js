import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';

// Import assets
import busIcon from '../../../../assets/bus.png';
import busInverted from '../../../../assets/bus inverted.png';
import locationIcon from '../../../../assets/location.png';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();

  // State to hold animated coordinates
  const [animatedCoordinates, setAnimatedCoordinates] = useState([]);

  // Route Coordinates
  const routeCoordinates = [
    { latitude: 8.484825175487972, longitude: 124.65648890310474 }, // Starting Point
    { latitude: 8.48443894384918, longitude: 124.65759648778983 }, // Turn 1
    { latitude: 8.483615572034235, longitude: 124.66101831594058 }, // Turn 2
    { latitude: 8.481799022193625, longitude: 124.66794780293056 }, // Turn 3
    { latitude: 8.47957491382939, longitude: 124.67285021045753 }, // Turn 4
    { latitude: 8.477177781842084, longitude: 124.67711743736216 }, // End Point
  ];

  // Animate polyline drawing
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < routeCoordinates.length) {
        setAnimatedCoordinates((prevCoords) => {
          const newCoord = routeCoordinates[index];
          if (newCoord && newCoord.latitude && newCoord.longitude) {
            return [...prevCoords, newCoord];
          }
          return prevCoords;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500); // Adjust speed here

    return () => clearInterval(interval);
  }, []);

  const handleBookNowClick = () => {
    navigation.navigate('Transport');
  };

  return (
    <View style={styles.container}>
      {/* Google Maps */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 8.4825,
          longitude: 124.6660,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Start Marker */}
        <Marker coordinate={routeCoordinates[0]} title="Start Point" description="Starting Location">
          <Image source={busInverted} style={styles.markerImage} />
        </Marker>

        {/* End Marker */}
        <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]} title="End Point" description="Destination">
          <Image source={locationIcon} style={styles.markerImage} />
        </Marker>

        {/* Animated Polyline */}
        {animatedCoordinates.length > 0 && (
          <Polyline
            coordinates={animatedCoordinates.filter(coord => coord && coord.latitude && coord.longitude)}
            strokeColor="#00FF00"
            strokeWidth={5}
          />
        )}
      </MapView>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to PasaHEREro</Text>
          <Text style={styles.subtitle}>Effortless Travel Made Simple</Text>
          <Text style={styles.subtitle}>Enjoy seamless bookings and real-time updates!</Text>
        </View>
        <Image source={busIcon} style={styles.busIcon} />
      </View>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNowClick} activeOpacity={0.8}>
        <Text style={styles.bookNowText}>Book Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  markerImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4B79A1',
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: width * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  busIcon: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },
  bookNowButton: {
    backgroundColor: '#4B79A1',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: width * 0.1,
    elevation: 10,
    position: 'absolute',
    bottom: height * 0.05,
    left: '20%',
    zIndex: 2,
  },
  bookNowText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Home;
