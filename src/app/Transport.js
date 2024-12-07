import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Transport = () => {
  const [selectedLoading, setSelectedLoading] = useState(null);
  const [selectedUnloading, setSelectedUnloading] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  const handleLoadingPress = (spotNumber) => {
    setSelectedLoading(spotNumber);
  };

  const handleUnloadingPress = (spotNumber) => {
    setSelectedUnloading(spotNumber);
  };

  const isSelectedLoading = (spotNumber) => selectedLoading === spotNumber;
  const isSelectedUnloading = (spotNumber) => selectedUnloading === spotNumber;

  const handleBookPress = () => {
    if (selectedLoading && selectedUnloading) {
      navigation.navigate('SelectPayment'); // Navigate to SelectPayment screen
    } else {
      Alert.alert('Selection Required', 'Please select both loading and unloading spots.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>BOOK YOUR DESTINATION</Text>
        </View>
        <Image
          source={require('../../assets/bus.png')} // Adjust the path as needed
          style={styles.busIcon}
        />
      </View>

      {/* Loading Spots */}
      <View style={styles.spotsContainer}>
        <Text style={styles.spotTitle}>Loading Spots</Text>
        <View style={styles.imageRow}>
          <TouchableOpacity onPress={() => handleLoadingPress(1)}>
            <Image
              source={require('../../assets/loading1.png')}
              style={[styles.spotImage, isSelectedLoading(1) && styles.selectedImage]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLoadingPress(2)}>
            <Image
              source={require('../../assets/loading2.png')}
              style={[styles.spotImage, isSelectedLoading(2) && styles.selectedImage]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLoadingPress(3)}>
            <Image
              source={require('../../assets/loading3.png')}
              style={[styles.spotPlaceholder, isSelectedLoading(3) && styles.selectedImage]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Unloading Spots */}
      <View style={styles.spotsContainer}>
        <Text style={styles.spotTitle}>Unloading Spots</Text>
        <View style={styles.imageRow}>
          <TouchableOpacity onPress={() => handleUnloadingPress(1)}>
            <Image
              source={require('../../assets/unloading1.png')}
              style={[styles.spotImage, isSelectedUnloading(1) && styles.selectedImage]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUnloadingPress(2)}>
            <Image
              source={require('../../assets/unloading2.png')}
              style={[styles.spotPlaceholder, isSelectedUnloading(2) && styles.selectedImage]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUnloadingPress(3)}>
            <Image
              source={require('../../assets/unloading3.png')}
              style={[styles.spotPlaceholder, isSelectedUnloading(3) && styles.selectedImage]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF2F8' },
  header: {
    backgroundColor: '#4B79A1',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',  // Positioning the button in top-left
    top: 0,               // Positioning from the top of the header
    left: 5,              // Positioning from the left of the header
    padding: 0,
  },
  backButtonText: {
    fontSize: 50,
    color: '#FFFFFF',
  },
  textContainer: { flex: 1, paddingRight: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'left', marginBottom: 10 },
  busIcon: { width: 150, height: 150, resizeMode: 'contain' },
  spotsContainer: { margin: 10 },
  spotTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  imageRow: { flexDirection: 'row', justifyContent: 'space-between' },
  spotImage: { width: 100, height: 100, resizeMode: 'cover' },
  spotPlaceholder: { width: 100, height: 100, backgroundColor: '#D3D3D3' },
  selectedImage: { borderWidth: 3, borderColor: 'red', borderRadius: 5 },
  bookButton: { backgroundColor: '#007BFF', padding: 15, alignItems: 'center', margin: 20, borderRadius: 5 },
  bookButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default Transport;
