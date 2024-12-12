import AsyncStorage from '@react-native-async-storage/async-storage';

// This file contains all functions related to creating and managing the playlist

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Create a new empty playlist with the given name and description
export async function createPlaylist(token, name, description) {
    const profile = JSON.parse(await AsyncStorage.getItem('profile'));
    const userID = profile.id;
    const accessToken = token;

    const result = await fetch(
        proxyUrl + 'https://api.spotify.com/v1/users/' + userID + '/playlists',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
            }),
        }
    );
    return await result.json();
}

// Find the Spotify ID of a song
async function searchTrack(song) {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const result = await fetch(
        proxyUrl + 'https://api.spotify.com/v1/search?q=' + song + '&type=track&limit=1',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    const data = await result.json();
    return data.tracks.items[0].uri;
}

// Find the Spotify ID of all songs in the list
export async function findAllTracks(songs) {
    const uris = [];
    for (const song of songs) {
        const uri = await searchTrack(song);
        uris.push(uri);
    }
    return uris;
}

export async function addToPlaylist(listID, songUris) {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const result = await fetch(
        proxyUrl + 'https://api.spotify.com/v1/playlists/' + listID + '/tracks',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: songUris,
                position: 0,
            }),
        }
    );

    return await result.json();
}