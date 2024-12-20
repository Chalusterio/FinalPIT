import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeDriver = () => {
  const navigation = useNavigation();

  const handleBusCircleClick = () => {
    navigation.navigate('AvailableBus'); // Navigates to the AvailableBus screen
  };

  const handleLocationClick = () => {
    navigation.navigate('AvailableCommuters'); // Navigates to the AvailableCommuters screen
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

      {/* Bus Circle and Location Icon */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.circularBackground}
          onPress={handleBusCircleClick}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../../../assets/bus-circle.png')} // Path for the bus circle icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.circularBackground, { marginLeft: 10 }]}
          onPress={handleLocationClick}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../../../assets/location.png')} // Path for the location icon
            style={styles.icon}
          />
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Adjust for desired vertical position
  },
  circularBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9EAFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default HomeDriver;
