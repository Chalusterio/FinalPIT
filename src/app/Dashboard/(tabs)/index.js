import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();

  const handleBookNowClick = () => {
    navigation.navigate('Transport'); // Navigates to the Transport.js screen
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to PasaHEREro</Text>
          <Text style={styles.subtitle}>Effortless Travel Made Simple</Text>
          <Text style={styles.subtitle}>Enjoy seamless bookings and real-time updates!</Text>
        </View>
        <Image
          source={require('../../../../assets/bus.png')} // Corrected path for the bus icon
          style={styles.busIcon}
        />
      </View>

      {/* Bus Circle and "Book Now!" Button */}
      <View style={styles.bookNowContainer}>
        <View style={styles.busCircleContainer}>
          <Image
            source={require('../../../../assets/bus-circle.png')} // Path for the bus circle icon
            style={styles.busCircleIcon}
          />
        </View>
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={handleBookNowClick}
          activeOpacity={0.8}
          accessibilityLabel="Book a ride now"
          accessible
        >
          <Text style={styles.bookNowText}>Book Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  header: {
    backgroundColor: '#4B79A1',
    paddingVertical: height * 0.03, // Dynamic padding based on screen height
    paddingHorizontal: width * 0.05, // Dynamic horizontal padding
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: width * 0.05, // Spacing between text and image
  },
  title: {
    fontSize: width * 0.07, // Dynamic font size
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: width * 0.04, // Dynamic font size
    color: '#FFFFFF',
    textAlign: 'left',
  },
  busIcon: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
  },
  bookNowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * -0.05, // Move container slightly upward
  },
  busCircleContainer: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#D9EAFD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02, // Space between circle and button
  },
  busCircleIcon: {
    width: width * 0.3,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  bookNowButton: {
    backgroundColor: '#4B79A1',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: width * 0.1,
    elevation: 10, // Add shadow effect
  },
  bookNowText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Home;
