import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getAccessToken } from './getprofile';


export default function App() {
  getAccessToken(process.env.CLIENT_ID, 'code')
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
