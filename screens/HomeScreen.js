import styles from '../styles';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { getprofile } from '../getprofile';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
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
			<Text>Give your playlist a name and description (optional) </Text>
			<TextInput
				editable
				maxLength={40}
				onChangeText={(text) => onChangeName(text)}
				value={listName}
				style={styles.textInput}
				onFocus={() => {
					if (listName === 'Playlist Name') {
						onChangeName('');
					}
				}}
			/>
			<TextInput
				editable
				maxLength={40}
				onChangeText={(text) => onChangeDesc(text)}
				value={listDesc}
				style={styles.textInput}
				onFocus={() => {
					if (listDesc === 'Playlist Description') {
						onChangeDesc('');
					}
				}}
			/>
			<Pressable
				style={[
					styles.button,
					{
						backgroundColor: listName === '' ? 'grey' : 'blue',
					},
				]}
				onPress={async () => {
					navigation.navigate('Songs', {
						listName: listName,
						listDesc: listDesc,
					});
				}}
				disabled={listName === ''}
			>
				<Text style={styles.buttonText}>Next</Text>
			</Pressable>
			<StatusBar style="auto" />
		</View>
	);
};

export default HomeScreen;
