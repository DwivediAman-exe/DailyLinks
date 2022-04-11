import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FooterTabs from '../components/nav/FooterTabs';

const Post = (props) => {
	return (
		<View style={styles.container}>
			<Text>Post screen</Text>
			<View style={styles.footer}>
				<FooterTabs />
			</View>
		</View>
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

export default Post;
