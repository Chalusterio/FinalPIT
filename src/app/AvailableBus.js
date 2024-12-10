import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AvailableBus = ({ navigation }) => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = [
          { id: '1', name: 'BUS 001', status: 'Occupied' },
          { id: '2', name: 'BUS 002', status: 'Available' },
          { id: '3', name: 'BUS 003', status: 'Occupied' },
          { id: '4', name: 'BUS 004', status: 'Available' },
          { id: '5', name: 'BUS 005', status: 'Available' },
        ];
        setBuses(response);
      } catch (error) {
        console.error('Error fetching buses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const renderBus = ({ item }) => (
    <View style={styles.busContainer}>
      <View style={styles.busDetails}>
        <Image
          source={require('../../assets/bus-icon.png')} 
          style={styles.busIcon}
        />
        <Text style={styles.busName}>{item.name}</Text>
      </View>
      <Text
        style={[
          styles.statusText,
          item.status === 'Available' ? styles.availableText : styles.occupiedText,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading buses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Available PUV's</Text>
      </View>
      <FlatList
        data={buses}
        keyExtractor={(item) => item.id}
        renderItem={renderBus}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 40,
  },
  backButton: {
    marginRight: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  busContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  busDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  busName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495E',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  availableText: {
    backgroundColor: '#D4EFDF',
    color: '#27AE60',
  },
  occupiedText: {
    backgroundColor: '#FADBD8',
    color: '#C0392B',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#7F8C8D',
  },
});

export default AvailableBus;
