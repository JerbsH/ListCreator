import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { addToPlaylist, createPlaylist, findAllTracks } from '../playlist';
import { aiSearchSongs } from '../aiListCreation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const SongsScreen = ({ navigation, route }) => {
    const [songName, setSong] = useState('Artist - Song Name');
    const [addedSongs, setAddedSongs] = useState([]);
    const [trackUris, setTrackUris] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [token, setToken] = useState(null);
    const [aiSongs, setAiSongs] = useState([]);
    const [isNextButtonActive, setIsNextButtonActive] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            setToken(accessToken);
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (addedSongs.length >= 5) {
            setIsNextButtonActive(true);
        } else {
            setIsNextButtonActive(false);
        }
    }, [addedSongs]);

    const handleAddSong = () => {
        if (songName && songName !== 'Artist - Song Name' && addedSongs.length < 5) {
            setAddedSongs([...addedSongs, songName]);
            setSong('Artist - Song Name');
        }
    };

    const handleNext = async () => {
        try {
            const aiResults = await aiSearchSongs(addedSongs);
						console.log(aiResults);
						
            const trackUris = await findAllTracks(aiResults);
            setTrackUris(trackUris);

            const newPlaylist = await createPlaylist(token, route.params.listName, route.params.listDesc);
            setPlaylist(newPlaylist);

            await addToPlaylist(newPlaylist.id, trackUris);
            navigation.navigate('Created');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Songs to Playlist</Text>
            <TextInput
                editable
                maxLength={40}
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
                onPress={handleAddSong}
                disabled={addedSongs.length >= 5}
            >
                <Text style={styles.buttonText}>Add Song</Text>
            </Pressable>
            {addedSongs.length > 0 && (
                <View>
                    <Text>Added Songs:</Text>
                    {addedSongs.map((song, index) => (
                        <Text key={index}>{song}</Text>
                    ))}
                </View>
            )}
            <Pressable
                style={[
                    styles.button,
                    {
                        backgroundColor: isNextButtonActive ? 'blue' : 'grey',
                    },
                ]}
                onPress={handleNext}
                disabled={!isNextButtonActive}
            >
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
        </View>
    );
};

export default SongsScreen;