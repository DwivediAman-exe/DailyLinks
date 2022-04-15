import React, { useContext, useEffect, useState } from 'react';
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
import SubmitButton from '../components/auth/SubmitButton';
import PreviewCard from '../components/links/PreviewCard';
import Search from '../components/links/Search';

const Home = ({ navigation }) => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);
	const [page, setPage] = useState(1);
	const [linksCount, setLinksCount] = useState(0);
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		fetchLinks();
	}, [page]);

	const fetchLinks = async () => {
		const { data } = await axios.get(`/links/${page}`);
		console.log(data);
		setLinks([...links, ...data]);
	};

	useEffect(() => {
		const linksCount = async () => {
			const { data } = await axios.get(`/links-count`);
			setLinksCount(data);
		};
		linksCount();
	}, []);

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

	const searched = (keyword) => (item) => {
		return item.urlPreview.ogTitle
			.toLowerCase()
			.includes(keyword.toLowerCase());
	};

	return (
		<ImageBackground
			source={require('../assets/loginbackground.png')}
			style={styles.background}
			blurRadius={4}
			resizeMode="cover"
		>
			<View style={styles.container}>
				<Search value={keyword} setValue={setKeyword} />
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.title}>Recent Links</Text>

					{links &&
						links.filter(searched(keyword)).map((link) => (
							<View key={link._id} style={styles.linkscontainer}>
								<PreviewCard
									{...link.urlPreview}
									handlePress={handlePress}
									link={link}
									showIcons={true}
								/>
							</View>
						))}

					{linksCount > links?.length && (
						<SubmitButton
							title="Load more"
							handleSubmit={() => setPage(page + 1)}
						/>
					)}
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
		fontSize: 25,
		alignSelf: 'center',
		paddingTop: 20,
		marginBottom: 30,
		color: '#86C6F4',
		fontWeight: 'bold',
	},
	linkscontainer: {
		alignItems: 'center',
	},
});

export default Home;
