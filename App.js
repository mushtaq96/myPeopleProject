
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 0
})

//requesting to access location data
const permissionHandle = async () => {

  console.log('here')

  //check existing permission before requesting
  let permission = await RNLocation.checkPermission({
    android: {
      detail: 'coarse'
    }
  });

  let userLocation;
  if (!permission) {
    //to get  user permission
    permission = await RNLocation.requestPermission({
      android: {
        detail: "coarse",
        rationale: {
          title: 'hey mush I need to access your location',
          message: 'I need to use your location to show where you are currently situated',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel'
        }
      }
    })
    console.log(permission)
    userLocation = await RNLocation.getLatestLocation({ timeout: 100 })
    console.log(userLocation, userLocation.longitude, userLocation.latitude, userLocation.timestamp)
  }
  else {
    console.log('here 7')
    userLocation = await RNLocation.getLatestLocation({ timeout: 100 })
    console.log(userLocation, userLocation.longitude, userLocation.latitude, userLocation.timestamp)
  }
}


const App = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to my People's app!</Text>

      <View style={{ marginTop: 10, padding: 10 }}>
        <Button title="get location"
          onPress={permissionHandle} />
      </View>
      <Text>Latitude: </Text>
      <Text>Longitude:</Text>
      <View style={{ marginTop: 10, padding: 10 }}>
        <Button title="send location" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;