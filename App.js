import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from './src/UserProfile';
import LogIn from './src/LogIn';
import Register from './src/Register';
import PasswordRecovery from './src/PasswordRecovery'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} options={{ title: 'Password Recovery' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
