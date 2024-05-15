import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	textInput: {
		margin: 10,
		padding: 10,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
	},
	button: {
		margin: 10,
		marginTop: 20,
		padding: 10,
		backgroundColor: 'blue',
		borderRadius: 10,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default styles;
