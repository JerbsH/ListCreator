import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getprofile } from './getprofile';
import { createPlaylist } from './createPlaylist';

export default function App() {
  getprofile();
  createPlaylist();
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
