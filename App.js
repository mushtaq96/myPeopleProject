import React, { useState } from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import RNLocation from 'react-native-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


RNLocation.configure({
  distanceFilter: 0//configure the distance to default value in meters
})

const App = ({ url }) => {

  const [viewLocation, isViewLocation] = useState([
    viewLocation.longitude = 0,
    viewLocation.latitude = 0
  ]);

  const [tweet, setTweet] = useState([viewLocation.longitude, viewLocation.latitude]);

  const tweetLocation = () => {
    let twitterParameters = [];

    try {
      if (tweet) {
        twitterParameters.push('text=' + encodeURI(tweet));
      }
      const url = 'https:twitter.com/intent/tweet?' + twitterParameters.join('&');

      Linking.openURL(url)
    } catch (error) {
      alert('oops something went wrong, dig in to find out')//console.log(error);
    }
  }

  //requesting to access location data
  const getLocation = async () => {//this will return a promise
    console.log('i am here')
    //check existing permission before requesting
    let permission = await RNLocation.checkPermission({
      android: {
        detail: 'coarse'
      }
    });
    console.log(permission)

    let userLocation;

    if (!permission) {
      //get user's permission
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
      console.log(userLocation)
      isViewLocation(userLocation)
    }
    else {
      console.log('here again')
      userLocation = await RNLocation.getLatestLocation({ timeout: 100 })
      console.log(userLocation)
      isViewLocation(userLocation)
      setTweet([viewLocation.longitude, viewLocation.latitude])
    }
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to my People's app!</Text>
      <View style={{ marginTop: 10, padding: 10 }}>
        <Button title="get location"
          onPress={getLocation} />
      </View>
      <Text>Latitude:{viewLocation.latitude} </Text>
      <Text>Longitude:{viewLocation.longitude}</Text>
      <View style={{ marginTop: 10, padding: 10 }}>
        <Button title="send location to my twitter feed" onPress={tweetLocation} />
      </View>
      <MapView
        style={{ width: '100%', height: 400 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: { viewLocation.latitude },
          longitude: viewLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      ></MapView>
    </View >

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