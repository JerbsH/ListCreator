import { StatusBar } from 'expo-status-bar';
import {
	Pressable,
	Text,
	TextInput,
	View,
} from 'react-native';
import { createPlaylist } from './playlist';
import React, { useEffect } from 'react';
import { getprofile } from './getprofile';
import { useState } from 'react';
import styles from './styles';

export default function App() {
	const [token, setToken] = useState(null);
	const [profile, setProfile] = useState(null);
	const [listName, onChangeName] = useState('Playlist Name');
	const [listDesc, onChangeDesc] = useState('Playlist Description');

	useEffect(() => {
		const fetchProfile = async () => {
			await getprofile();
			setToken(localStorage.getItem('accessToken'));
		};
		fetchProfile();
		setProfile(localStorage.getItem('profile'));
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to ListCreator</Text>
			<TextInput
				editable
				maxLength={40}
				onChangeText={(text) => onChangeName(text)}
				value={listName}
				style={styles.textInput}
			/>
			<TextInput
				editable
				maxLength={40}
				onChangeText={(text) => onChangeDesc(text)}
				value={listDesc}
				style={styles.textInput}
			/>
			<Pressable
				style={styles.button}
				onPress={async () => {
          const res =  await createPlaylist(token, listName, listDesc)

        }}
			>
				<Text style={styles.buttonText}>Next</Text>
			</Pressable>
			<StatusBar style="auto" />
		</View>
	);
}

// onPress={() => createPlaylist(token, listName, listDesc, isEnabled)}