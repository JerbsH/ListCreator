import styles from '../styles';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SongsScreen = ({ navigation, route }) => {
	const [songName, setSong] = useState('Artist - Song Name');
	const [addedSongs, setAddedSongs] = useState([]);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				List to be created: {route.params.listName}
			</Text>
			<Text>Add 5 songs to use as inspiration for your list</Text>
			<Text style={styles.header}>Songs added: {addedSongs.toString()}</Text>
			<TextInput
				editable
				onChangeText={(text) => setSong(text)}
				value={songName}
				style={styles.textInput}
				onFocus={() => {
					if (songName === 'Artist - Song Name') {
						setSong('');
					}
				}}
			/>

			<Pressable
				style={[
					styles.button,
					{
						backgroundColor: addedSongs.length >= 5 ? 'grey' : 'blue',
					},
				]}
				onPress={() => {
					setAddedSongs((prevSongs) => [...prevSongs, songName]);
					setSong('');
				}}
				disabled={addedSongs.length >= 5}
			>
				<Text style={styles.buttonText}>Add to list</Text>
			</Pressable>

			<Pressable
				style={styles.button}
				onPress={() => {
					console.log('Button pressed');
					navigation.navigate('Home');
				}}
			>
				<Text style={styles.buttonText}>Back</Text>
			</Pressable>
			<StatusBar style="auto" />
		</View>
	);
};

export default SongsScreen;
