import React from 'react';  
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; // Import for Activity icon

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#EAF2F8', // Matches the background theme of index.js
          borderTopWidth: 0, // Remove border
          shadowColor: '#000', // Shadow color
          shadowOffset: { width: 0, height: -1 }, // Offset for the shadow
          shadowOpacity: 0.1, // Shadow opacity (adjust for more/less shadow)
          shadowRadius: 3, // Blur radius for shadow
          elevation: 5, // Elevation for Android shadow
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#4B79A1', // Active tab color
        tabBarInactiveTintColor: '#808080', // Inactive tab color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'} // Active and inactive icons
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
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="clipboard-list" // Matches the icon for activity
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="account-circle" // Matches the icon for account
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
