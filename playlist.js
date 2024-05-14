const profile = JSON.parse(localStorage.getItem('profile'));
const userID = profile.id;

async function createPlaylist() {
	const result = await fetch(
		'https://api.spotify.com/v1/users/' + userID + '/playlists',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userID.access_token}`,
				ContentType: 'application/json',
			},
		}
	);
	return await result.json();
}
