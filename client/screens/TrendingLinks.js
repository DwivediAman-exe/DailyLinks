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

const RenderLinks = ({ links, handlePress }) => {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{links.map((link) => (
				<View key={link._id} style={styles.linkscontainer}>
					<PreviewCard
						{...link.urlPreview}
						handlePress={handlePress}
						link={link}
						showIcons={true}
					/>
				</View>
			))}
		</ScrollView>
	);
};

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
			source={require('../assets/loginbackground.png')}
			style={styles.background}
			blurRadius={2}
			resizeMode="cover"
		>
			<View style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={styles.container1}
				>
					<Text style={styles.title}>Most Viewed</Text>
					<RenderLinks
						links={
							links &&
							links
								.sort((a, b) => (b.views > a.views ? 1 : -1))
								.slice(0, 10)
						}
						handlePress={handlePress}
					/>

					<Text style={styles.title}>Most Liked</Text>
					<RenderLinks
						links={
							links &&
							links
								.sort((a, b) =>
									b.likes.length > a.likes.length ? 1 : -1
								)
								.slice(0, 10)
						}
						handlePress={handlePress}
					/>

					<Text style={styles.title}>Latest Links</Text>
					<RenderLinks
						links={
							links &&
							links
								.sort((a, b) =>
									b.createdAt > a.createdAt ? 1 : -1
								)
								.slice(0, 10)
						}
						handlePress={handlePress}
					/>
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
	container1: {
		marginBottom: 15,
	},
	title: {
		fontSize: 20,
		alignSelf: 'center',
		marginVertical: 20,
		paddingTop: 10,
		color: '#86C6F4',
	},
	linkscontainer: {
		alignItems: 'center',
		width: 370,
		height: 300,
	},
});

export default TrendingLinks;
