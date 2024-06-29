

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '@/navigation/DrawerNavigator';
import SignIn from '@/components/pages/SingIn';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer independent={true}>
      {isLoggedIn ? (
        <DrawerNavigator />
      ) : (
        <SignIn onSignIn={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}