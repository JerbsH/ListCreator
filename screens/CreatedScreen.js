import { View, Text} from "react-native";
import styles from '../styles';

const CreatedScreen = ({navigation}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>list created</Text>
		</View>
	);
};

export default CreatedScreen;