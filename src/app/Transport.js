// Transport.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Transport = () => {
  const [selectedLoading, setSelectedLoading] = useState(null);
  const [selectedUnloading, setSelectedUnloading] = useState(null);
  const navigation = useNavigation();

  const loadingSpots = [
    { id: 1, name: 'USTP CDO', image: require('../../assets/loading1.png') },
    { id: 2, name: 'SM Downtown', image: require('../../assets/loading2.png') },
    { id: 3, name: 'Limketkai Mall', image: require('../../assets/loading3.png') },
  ];

  const unloadingSpots = [
    { id: 1, name: 'Cogon', image: require('../../assets/unloading1.png') },
    { id: 2, name: 'Ayala', image: require('../../assets/unloading2.png') },
    { id: 3, name: 'Gusa', image: require('../../assets/unloading3.png') },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSpotPress = (spotType, spotId) => {
    if (spotType === 'loading') {
      setSelectedLoading((prev) => (prev === spotId ? null : spotId));
    } else {
      setSelectedUnloading((prev) => (prev === spotId ? null : spotId));
    }
  };

  const handleBookPress = () => {
    const loadingSpot = loadingSpots.find((spot) => spot.id === selectedLoading);
    const unloadingSpot = unloadingSpots.find((spot) => spot.id === selectedUnloading);

    if (loadingSpot && unloadingSpot) {
      navigation.navigate('SelectPayment', {
        loadingSpot,
        unloadingSpot,
      });
    }
  };

  const isSelected = (spotType, spotId) => {
    return spotType === 'loading'
      ? selectedLoading === spotId
      : selectedUnloading === spotId;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Transport</Text>
      </View>

      <View style={styles.spotsContainer}>
        <Text style={styles.spotTitle}>Loading Spots</Text>
        <View style={styles.imageRow}>
          {loadingSpots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              onPress={() => handleSpotPress('loading', spot.id)}
            >
              <Image
                source={spot.image}
                style={[
                  styles.spotImage,
                  isSelected('loading', spot.id) && styles.selectedImage,
                ]}
              />
              <Text style={styles.spotText}>{spot.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.spotsContainer}>
        <Text style={styles.spotTitle}>Unloading Spots</Text>
        <View style={styles.imageRow}>
          {unloadingSpots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              onPress={() => handleSpotPress('unloading', spot.id)}
            >
              <Image
                source={spot.image}
                style={[
                  styles.spotImage,
                  isSelected('unloading', spot.id) && styles.selectedImage,
                ]}
              />
              <Text style={styles.spotText}>{spot.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.bookButton,
          !(selectedLoading && selectedUnloading) && { backgroundColor: '#A9A9A9' },
        ]}
        onPress={handleBookPress}
        disabled={!(selectedLoading && selectedUnloading)}
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  spotsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  spotTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  spotImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D0D7E3',
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: '#81BFDA',
  },
  spotText: {
    textAlign: 'center',
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: '#4B79A1',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Transport;
