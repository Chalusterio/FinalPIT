import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: styles.drawerStyle,
          drawerContentOptions: {
            activeTintColor: '#ffffff',
            activeBackgroundColor: '#1877F2', 
            inactiveTintColor: '#333333',
            labelStyle: styles.labelStyle,
          },
          headerStyle: {
            backgroundColor: '#1877F2', 
            shadowColor: 'transparent',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Messages"
          options={{
            drawerLabel: 'Messages',
            title: 'Messages',
            drawerIcon: ({ color, size }) => (
              <AntDesign name="message1" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Projects"
          options={{
            drawerLabel: 'Projects',
            title: 'Projects',
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="projector-screen-variant-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#f5f5f5',
    width: 250,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
