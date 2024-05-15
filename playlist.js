export async function createPlaylist(token, name, description) {
	const profile = JSON.parse(localStorage.getItem('profile'));
	const userID = profile.id;
	const accessToken = token;

	const result = await fetch(
		'https://api.spotify.com/v1/users/' + userID + '/playlists/',
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
