import React, { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AuthContext } from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinkContext } from '../context/link';

const Home = () => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);

	return (
		<SafeAreaView style={styles.container}>
			<Text>{JSON.stringify(state, null, 4)}</Text>
			<View style={styles.footer}>
				<FooterTabs />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});

export default Home;
