import React, { useState } from 'react';
import { View, StyleSheet, Animated, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

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
            >
              <MaterialIcons name="close" size={28} color="#4B79A1" />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.headerText}>Saved Places</Text>
        </View>
      </View>

      {/* Add New Section */}
      <TouchableOpacity style={styles.addNewContainer} onPress={handleAddNewPlace}>
        <FontAwesome name="plus" size={24} color="#4B79A1" style={styles.icon} />
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
              <FontAwesome name="home" size={24} color="#4B79A1" style={styles.icon} />
              <View>
                <Text style={styles.placeTitle}>{item.title}</Text>
                <Text style={styles.placeLocation}>{item.location}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDeletePlace(index)}>
              <MaterialIcons name="delete" size={24} color="#FF5C5C" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No places saved yet. Add some!</Text>
        }
        contentContainerStyle={{ paddingHorizontal: 15 }}
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
    height: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  placeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  placeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B79A1',
  },
  placeLocation: {
    fontSize: 14,
    color: '#6A6A6A',
  },
  addNewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#4B79A1',
  },
  addNewSubtitle: {
    fontSize: 14,
    color: '#6A6A6A',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
    marginTop: 20,
  },
});

export default SavedPlaces;
