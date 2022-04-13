import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import FooterTabs from '../components/nav/FooterTabs';
import { WebView } from 'react-native-webview';

const LinkView = ({ route }) => {
	const [weblink, setWeblink] = useState('');

	useEffect(() => {
		if (route.params?.link) {
			if (route.params.link.link.includes('http' || 'https')) {
				setWeblink(route.params.link.link);
			} else {
				setWeblink(`http://${route.params.link.link}`);
			}
		}
	}, [route.params?.link]);

	const ActivityIndicatorElement = () => {
		return (
			<ActivityIndicator
				color="#009688"
				size={40}
				style={styles.activityIndicatorStyle}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<WebView
				renderLoading={ActivityIndicatorElement}
				startInLoadingState={true}
				source={{ uri: weblink }}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	activityIndicatorStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default LinkView;
