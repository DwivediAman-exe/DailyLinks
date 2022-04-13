import React, { useContext, useEffect } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';
import { LinkContext } from '../context/link';
import axios from 'axios';
import PreviewCard from '../components/links/PreviewCard';

const Home = ({ navigation }) => {
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
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.title}>Recent Links</Text>

				{links.length > 0 &&
					links.map((link) => (
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

			<FooterTabs />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		alignSelf: 'center',
		paddingTop: 20,
		marginBottom: 30,
	},
	linkscontainer: {
		alignItems: 'center',
	},
});

export default Home;
