import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 20, // Add spacing between the text and the bus image
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  busIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  bookNowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, // Move the container slightly upward
  },
  busCircleContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#D9EAFD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Space between the circle and the button
  },
  busCircleIcon: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
  },
  bookNowButton: {
    backgroundColor: '#4B79A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 10, // Add shadow effect
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Home;
