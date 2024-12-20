import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce'; // Import debounce

const Transport = () => {
  const [selectedLoading, setSelectedLoading] = useState(null);
  const [selectedUnloading, setSelectedUnloading] = useState(null);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLoadingPress = (spotNumber) => {
    setSelectedLoading((prev) => (prev === spotNumber ? null : spotNumber));
  };

  const handleUnloadingPress = (spotNumber) => {
    setSelectedUnloading((prev) => (prev === spotNumber ? null : spotNumber));
  };

  // Define these functions to check selection status
  const isSelectedLoading = (spotNumber) => selectedLoading === spotNumber;
  const isSelectedUnloading = (spotNumber) => selectedUnloading === spotNumber;

  const handleBookPress = debounce(() => {
    navigation.navigate('SelectPayment');
  }, 500); // Debounce to avoid multiple triggers

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Transport</Text>
          </View>
          <Text style={styles.subtitle}>Book Your Destination:{'\n'}Journey Made Simple!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/bus.png')}
            style={styles.busIcon}
          />
        </View>
      </View>

      {/* Loading Spots */}
      <View style={styles.spotsContainer}>
        <Text style={styles.spotTitle}>Loading Spots</Text>
        <View style={styles.imageRow}>
          <TouchableOpacity onPress={() => handleLoadingPress(1)}>
            <Image
              source={require('../../assets/loading1.png')}
              style={[
                styles.spotImage,
                isSelectedLoading(1) && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLoadingPress(2)}>
            <Image
              source={require('../../assets/loading2.png')}
              style={[
                styles.spotImage,
                isSelectedLoading(2) && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLoadingPress(3)}>
            <Image
              source={require('../../assets/loading3.png')}
              style={[
                styles.spotPlaceholder,
                isSelectedLoading(3) && styles.selectedImage,
              ]}
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
              style={[
                styles.spotImage,
                isSelectedUnloading(1) && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUnloadingPress(2)}>
            <Image
              source={require('../../assets/unloading2.png')}
              style={[
                styles.spotPlaceholder,
                isSelectedUnloading(2) && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUnloadingPress(3)}>
            <Image
              source={require('../../assets/unloading3.png')}
              style={[
                styles.spotPlaceholder,
                isSelectedUnloading(3) && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity
        style={[
          styles.bookButton,
          !(selectedLoading && selectedUnloading) && { backgroundColor: '#A9A9A9' }, // Disabled color
        ]}
        onPress={handleBookPress}
        disabled={!(selectedLoading && selectedUnloading)} // Disable when not valid
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column', // Align the back button and title horizontally
    alignItems: 'start', // Align them vertically
  },
  titleContainer: {
    flexDirection: 'row',
  },
  backButton: {
    marginRight: 10, // Space between the back button and the title
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'start',
    marginTop: 10, // Space between the title/image and the subtitle
  },
  imageContainer: {
    width: 150, // Width of the image container
    overflow: 'hidden',
  },
  busIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
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
    backgroundColor: '#F0F4F8',
    borderWidth: 1,
    borderColor: '#D0D7E3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  spotPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 15,
    backgroundColor: '#E5E9F0',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: '#81BFDA',
    borderRadius: 15,
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
