import React, { useContext, useEffect } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	ImageBackground,
} from 'react-native';
import { AuthContext } from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';
import { LinkContext } from '../context/link';
import axios from 'axios';
import PreviewCard from '../components/links/PreviewCard';

const TrendingLinks = ({ navigation }) => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);

	useEffect(() => {
		fetchLinks();
	}, []);

	const fetchLinks = async () => {
		const { data } = await axios.get('/links');
		setLinks(data);
	};

	const handlePress = async (link) => {
		await axios.put(`/view-count/${link._id}`);
		navigation.navigate('LinkView', { link });
		// update link in the context
		setLinks(() => {
			const index = links.findIndex((l) => l._id === link._id);
			links[index] = { ...link, views: link.views + 1 };
			return [...links];
		});
	};

	return (
		<ImageBackground
			source={require('../assets/background.jpg')}
			style={styles.background}
			blurRadius={2}
			resizeMode="cover"
		>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.title}>Trending Links</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						{links &&
							links
								.sort((a, b) => (b.views > a.views ? 1 : -1))
								.slice(0, 10)
								.map((link) => (
									<View
										key={link._id}
										style={styles.linkscontainer}
									>
										<PreviewCard
											{...link.urlPreview}
											handlePress={handlePress}
											link={link}
											showIcons={true}
										/>
									</View>
								))}
					</ScrollView>

					<Text style={styles.title}>Most Liked</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						{links &&
							links
								.sort((a, b) =>
									b.likes.length > a.likes.length ? 1 : -1
								)
								.slice(0, 10)
								.map((link) => (
									<View
										key={link._id}
										style={styles.linkscontainer}
									>
										<PreviewCard
											{...link.urlPreview}
											handlePress={handlePress}
											link={link}
											showIcons={true}
										/>
									</View>
								))}
					</ScrollView>
				</ScrollView>

				<FooterTabs />
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
		height: '100%',
	},
	title: {
		fontSize: 20,
		alignSelf: 'center',
		marginVertical: 20,
	},
	linkscontainer: {
		alignItems: 'center',
		width: 370,
		height: 300,
	},
});

export default TrendingLinks;