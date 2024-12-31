import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from './src/LogIn'; // Make sure the path is correct
import UserProfile from './src/UserProfile';
import Register from './src/Register';
import PasswordRecovery from './src/PasswordRecovery';
import Transport from './src/Transport';
import PaymentMed from './src/PaymentMed'; // Updated to use PaymentMed
import HomeDriver from './src/HomeDriver'; // Adjust the path accordingly
import AvailableCommuters from './src/AvailableCommuters';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        {/* LogIn Screen */}
        <Stack.Screen 
          name="LogIn" 
          component={LogIn} 
          options={{ headerShown: false }} 
        />

        {/* PaymentMed Screen (immediately after login) */}
        <Stack.Screen 
          name="PaymentMed" 
          component={PaymentMed} 
          options={{ title: 'Payment Methods' }} 
        />

        {/* Other Screens */}
        <Stack.Screen 
          name="UserProfile" 
          component={UserProfile} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ title: 'Register' }} 
        />
        <Stack.Screen 
          name="PasswordRecovery" 
          component={PasswordRecovery} 
          options={{ title: 'Password Recovery' }} 
        />
        <Stack.Screen 
          name="Transport" 
          component={Transport} 
          options={{ title: 'Transport' }} 
        />
        <Stack.Screen 
          name="HomeDriver" 
          component={HomeDriver} 
          options={{ title: 'Home Driver' }} 
        />
        <Stack.Screen 
          name="AvailableCommuters" 
          component={AvailableCommuters} 
          options={{ title: 'Available Commuters' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
