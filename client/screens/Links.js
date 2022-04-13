import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import FooterTabs from '../components/nav/FooterTabs';

const Links = (props) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<Text>Links screen</Text>
			</ScrollView>
			<FooterTabs />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Links;
