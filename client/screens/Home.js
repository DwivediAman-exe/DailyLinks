import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth';

const Home = (props) => {
	const [state, setState] = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Text>{JSON.stringify(state, null, 4)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default Home;
