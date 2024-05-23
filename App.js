import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SongsScreen from './screens/SongsScreen';

export default function App() {
	const Stack = createNativeStackNavigator();
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
				<Stack.Screen name="Songs" component={SongsScreen} options={{headerShown: false}}/>
				<Stack.Screen name="Playlist" component={SongsScreen} options={{headerShown: false}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};