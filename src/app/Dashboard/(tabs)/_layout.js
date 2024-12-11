import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBarStyle,
          Platform.OS === 'ios' ? styles.iosShadow : styles.androidElevation,
        ],
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: '#4B79A1',
        tabBarInactiveTintColor: '#808080',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Activity"
        options={{
          title: 'Activity',
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clipboard-list" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#EAF2F8',
    borderTopWidth: 0,
    paddingBottom: 5,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  androidElevation: {
    elevation: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DashboardLayout;
