import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createPlaylist } from './playlist';
import React, { useEffect } from 'react';
import { getprofile } from './getprofile';
import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      await getprofile();
      setToken(localStorage.getItem('accessToken'));
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log("token from App.js: " + token);
    if (token != null) {
      createPlaylist(token);
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text>UI TEST</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
