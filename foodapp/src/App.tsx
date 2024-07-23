
import React, { useEffect, useState } from 'react'
import Login from './screens/auth/Login'
import OuterScreen from './screens/OuterScreen'
import Register from './screens/auth/Register'
import LoginSuccessful from './screens/auth/LoginSuccessful'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/root/Home'
import SharedScreen from './screens/root/SharedHome'
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const App = () => {
  const Stack = createNativeStackNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  auth().onUserChanged((user) => {
    if (user) { 
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  })

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "webclientId",
      offlineAccess: false,
    }) 
  }, [])

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='OuterScreen'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='OuterScreen'
            component={OuterScreen} 
          />
          {
            !isAuthenticated ?
              <>
                <Stack.Screen
                  name='Login'
                  component={Login}
                />
                <Stack.Screen
                  name='Register'
                  component={Register}
                /> 
              </> :
              <>
                <Stack.Screen
                  name='LoginSuccessful'
                  component={LoginSuccessful}
                />
                <Stack.Screen
                  name='Home'
                  component={Home}
                />
                <Stack.Screen
                  name='SharedScreen'
                  component={SharedScreen}
                />
              </>
          }
          {/* <Stack.Screen
            name='Login'
            component={Login}
          />
          <Stack.Screen
            name='Register'
            component={Register}
          />
          <Stack.Screen
            name='LoginSuccessful'
            component={LoginSuccessful}
          />
          <Stack.Screen
            name='Home'
            component={Home}
          />
          <Stack.Screen
            name='SharedScreen'
            component={SharedScreen}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App 