import Geolocation from "@react-native-community/geolocation";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

const App = () => {
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      e => setError(e.message)
    );
  };

  return (
    <View>
      <Button title="Get Current Position" onPress={getPosition} />
      {error ? (
        <Text>Error retrieving current position</Text>
      ) : (
          <>
            <Text>Latitude: {position.latitude}</Text>
            <Text>Longitude: {position.longitude}</Text>
          </>
        )}
    </View>
  );
};

export default App;