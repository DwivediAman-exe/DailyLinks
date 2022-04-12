import React, { useState, useContext } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	TextInput,
	Text,
	SafeAreaView,
} from 'react-native';
import FooterTabs from '../components/nav/FooterTabs';
import SubmitButton from '../components/auth/SubmitButton';
import ogs from '@uehreka/open-graph-scraper-react-native';
import urlRegex from 'url-regex';
import axios from 'axios';
import PreviewCard from '../components/links/PreviewCard';
import { LinkContext } from '../context/link';

const PostLink = ({ navigation }) => {
	const [links, setLinks] = useContext(LinkContext);
	const [link, setLink] = useState('');
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [urlPreview, setUrlPreview] = useState({});

	const handleChange = async (text) => {
		try {
			setLoading(true);
			setLink(text);

			if (urlRegex({ strict: false }).test(text)) {
				ogs({ url: text }, (error, results, response) => {
					if (results.success) {
						setUrlPreview(results);
					}
					setLoading(false);
				});
			} else {
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!link || !title) {
			alert('Please enter a Url and give it a title');
			return;
		}

		try {
			const { data } = await axios.post('/post-link', {
				title,
				link,
				urlPreview,
			});

			setLinks({ data, ...links });

			//update link context
			setTimeout(() => {
				alert('Link Posted successfully');
				navigation.navigate('Home');
			}, 500);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.title}>Paste Website URL</Text>

				<TextInput
					placeholder="Give it a title"
					autoCapitalize="sentences"
					value={title}
					onChangeText={(text) => setTitle(text)}
					style={styles.inputlink}
				/>
				<TextInput
					placeholder="Paste the url here"
					autoCapitalize="none"
					autoCorrect={false}
					value={link}
					onChangeText={(text) => handleChange(text)}
					style={styles.inputlink}
				/>

				{urlPreview.success && (
					<View
						style={{
							marginTop: 30,
							alignItems: 'center',
						}}
					>
						<PreviewCard {...urlPreview} />
					</View>
				)}

				<SubmitButton
					title="Submit"
					loading={loading}
					handleSubmit={handleSubmit}
				/>
			</ScrollView>

			<FooterTabs />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	title: {
		fontSize: 20,
		alignSelf: 'center',
		paddingTop: 20,
		marginBottom: 30,
	},
	inputlink: {
		marginHorizontal: 20,
		borderWidth: 2,
		paddingHorizontal: 15,
		borderColor: 'grey',
		height: 55,
		fontSize: 15,
		marginVertical: 10,
		borderRadius: 100,
	},
});

export default PostLink;
