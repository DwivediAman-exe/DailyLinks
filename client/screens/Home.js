import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = (props) => {
	const [state, setState] = useContext(AuthContext);

	return (
		<SafeAreaView style={styles.container}>
			<Text>{JSON.stringify(state, null, 4)}</Text>
			<FooterTabs />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
});

export default Home;
