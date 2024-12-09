import React, { useState } from 'react';
import { View, StyleSheet, Animated, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SavedPlaces = () => {
  const router = useRouter();

  const [scaleClose] = useState(new Animated.Value(1));
  const [places, setPlaces] = useState([{ title: 'Home', location: 'Cagayan de Oro City' }]);

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale, action) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      action();
    });
  };

  const handleClose = () => {
    router.push('/Dashboard/(tabs)/Account');
  };

  const handleDeletePlace = (index) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  const handleAddNewPlace = () => {
    router.push('/Maps'); // Replace '/Maps' with the actual route of your Maps screen
  };

  return (
    <View style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Animated.View style={{ transform: [{ scale: scaleClose }] }}>
            <TouchableOpacity
              onPressIn={() => handlePressIn(scaleClose)}
              onPressOut={() => handlePressOut(scaleClose, handleClose)}
              accessibilityLabel="Close"
              accessible
            >
              <MaterialIcons name="close" size={width * 0.07} color="#4B79A1" />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.headerText}>Saved Places</Text>
        </View>
      </View>

      {/* Add New Section */}
      <TouchableOpacity
        style={styles.addNewContainer}
        onPress={handleAddNewPlace}
        accessibilityLabel="Add a new saved place"
        accessible
      >
        <FontAwesome name="plus" size={width * 0.06} color="#4B79A1" style={styles.icon} />
        <View>
          <Text style={styles.addNewTitle}>Add New</Text>
          <Text style={styles.addNewSubtitle}>Save your favorite places</Text>
        </View>
      </TouchableOpacity>

      {/* Saved Places List */}
      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.placeItem}>
            <View style={styles.placeInfo}>
              <FontAwesome name="home" size={width * 0.06} color="#4B79A1" style={styles.icon} />
              <View>
                <Text style={styles.placeTitle}>{item.title}</Text>
                <Text style={styles.placeLocation}>{item.location}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleDeletePlace(index)}
              accessibilityLabel={`Delete ${item.title}`}
              accessible
            >
              <MaterialIcons name="delete" size={width * 0.06} color="#FF5C5C" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No places saved yet. Add some!</Text>
        }
        contentContainerStyle={{ paddingHorizontal: width * 0.04 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  header: {
    height: height * 0.12, // Responsive height
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 10,
  },
  placeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: height * 0.02,
    backgroundColor: '#FFFFFF',
    marginBottom: height * 0.015,
    borderRadius: width * 0.03,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
  },
  headerText: {
    textAlign: 'center',
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  placeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: width * 0.03,
  },
  placeTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#4B79A1',
  },
  placeLocation: {
    fontSize: width * 0.04,
    color: '#6A6A6A',
  },
  addNewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.04,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    padding: height * 0.02,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.03,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  addNewTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#4B79A1',
  },
  addNewSubtitle: {
    fontSize: width * 0.04,
    color: '#6A6A6A',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: width * 0.045,
    marginTop: height * 0.05,
  },
});

export default SavedPlaces;
