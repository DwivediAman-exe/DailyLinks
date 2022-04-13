import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { LinkContext } from '../../context/link';
import { AuthContext } from '../../context/auth';
import IconSet from '../../components/links/IconSet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PreviewCard = ({
	ogTitle = 'Untitled',
	ogDescription = 'No description found...',
	ogImage = {
		url: 'https://via.placeholder.com/500x500.png?text=NoPreviewImage',
	},
	handlePress = (f) => f,
	link = {},
	showIcons = false,
}) => {
	const [links, setLinks] = useContext(LinkContext);
	const [auth, setAuth] = useContext(AuthContext);

	const handleLikePress = async (link) => {
		// console.log("link clicked", link._id);
		const { data } = await axios.put('/like', { linkId: link._id });
		setLinks((links) => {
			const index = links.findIndex((l) => l._id === link._id);
			data.postedBy = auth.user;
			links[index] = data;
			return [...links];
		});
	};

	const handleUnLikePress = async (link) => {
		// console.log("link clicked", link._id);
		const { data } = await axios.put('/unlike', { linkId: link._id });
		setLinks((links) => {
			const index = links.findIndex((l) => l._id === link._id);
			data.postedBy = auth.user;
			links[index] = data;
			return [...links];
		});
	};

	const ogImageUrl = (ogImage) => {
		if (ogImage?.url) {
			return ogImage.url;
		} else if (ogImage?.length > 0) {
			return ogImage[0].url;
		} else {
			return 'https://via.placeholder.com/500x500.png?text=Image';
		}
	};

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: ogImageUrl(ogImage) }} />

			<IconSet
				handleLikePress={handleLikePress}
				handleUnLikePress={handleUnLikePress}
				link={link}
				showIcons={showIcons}
				auth={auth}
			/>

			<TouchableOpacity onPress={() => handlePress(link)}>
				<View style={{ padding: 5, height: 150 }}>
					<Text
						ellipsizeMode="tail"
						numberOfLines={2}
						style={{ paddingTop: 3, paddingBottom: 3 }}
					>
						{ogTitle}
					</Text>
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={{ fontSize: 10 }}
					>
						{ogDescription}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '92%',
		height: 300,
		borderRadius: 14,
		shadowColor: '#171717',
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5,
		marginBottom: 35,
		paddingBottom: 2,
		alignItems: 'center',
	},
	image: {
		height: '70%',
		width: '100%',
		borderTopRightRadius: 14,
		borderTopLeftRadius: 14,
	},
	eye: {
		position: 'absolute',
		right: 20,
		top: 10,
	},
	icon: {
		color: '#FD5D5D',
	},
	text: {
		color: '#FD5D5D',
		alignSelf: 'center',
	},
	heart: {
		position: 'absolute',
		right: 80,
		top: 10,
	},
});

export default PreviewCard;
