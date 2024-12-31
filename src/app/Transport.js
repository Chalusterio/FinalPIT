import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Transport = () => {
  const [selectedSpots, setSelectedSpots] = useState([]); // Store selected spots
  const navigation = useNavigation();

  const spots = [
    { id: 1, name: 'USTP CDO', image: require('../../assets/loading1.png') },
    { id: 2, name: 'SM Downtown', image: require('../../assets/loading2.png') },
    { id: 3, name: 'Limketkai Mall', image: require('../../assets/loading3.png') },
    { id: 4, name: 'Cogon', image: require('../../assets/unloading1.png') },
    { id: 5, name: 'Ayala', image: require('../../assets/unloading2.png') },
    { id: 6, name: 'Gusa', image: require('../../assets/unloading3.png') },
  ];

  // Reset state when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      setSelectedSpots([]);
    }, [])
  );

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSpotPress = (spotId) => {
    setSelectedSpots((prev) => {
      if (prev.includes(spotId)) {
        return prev.filter((id) => id !== spotId);
      }
      return prev.length < 2 ? [...prev, spotId] : prev;
    });
  };

  const handleBookPress = () => {
    if (selectedSpots.length === 2) {
      const loadingSpot = spots.find((spot) => spot.id === selectedSpots[0]);
      const unloadingSpot = spots.find((spot) => spot.id === selectedSpots[1]);

      // Pass the selected spots to the next screen
      navigation.navigate('SelectPayment', {
        loadingSpot,
        unloadingSpot,
      });
    }
  };

  const getSpotStyle = (spotId) => {
    if (selectedSpots[0] === spotId) return styles.firstSelectedImage;
    if (selectedSpots[1] === spotId) return styles.secondSelectedImage;
    return {};
  };

  const selectedSpotNames = selectedSpots.map((id) => spots.find((spot) => spot.id === id)?.name);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Transport</Text>
      </View>

      <View style={styles.spotsContainer}>
        <View style={styles.imageRow}>
          {spots.map((spot, index) => (
            <View key={spot.id} style={styles.spotWrapper}>
              <TouchableOpacity
                onPress={() => handleSpotPress(spot.id)}
              >
                <Image
                  source={spot.image}
                  style={[
                    styles.spotImage,
                    getSpotStyle(spot.id),
                  ]}
                />
              </TouchableOpacity>
              <Text style={styles.spotText}>{spot.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.bookButton,
          selectedSpots.length !== 2 && { backgroundColor: '#A9A9A9' },
        ]}
        onPress={handleBookPress}
        disabled={selectedSpots.length !== 2}
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>

      {selectedSpots.length === 2 && (
        <View style={styles.selectionDisplay}>
          <Text style={styles.selectionText}>
            {`${selectedSpotNames[0]} TO ${selectedSpotNames[1]}`}
          </Text>
          <Text style={styles.additionalInfo}>Ticket Price: 12₱</Text>
          <Text style={styles.additionalInfo}>ETA: 5 Minutes</Text>
        </View>
      )}
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
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  spotWrapper: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
  },
  spotImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D0D7E3',
    marginBottom: 5,
  },
  firstSelectedImage: {
    borderWidth: 3,
    borderColor: 'green',
  },
  secondSelectedImage: {
    borderWidth: 3,
    borderColor: 'red',
  },
  spotText: {
    textAlign: 'center',
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
  selectionDisplay: {
    alignItems: 'center',
    marginVertical: 10,
  },
  selectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  additionalInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 5,
  },
});

export default Transport;
