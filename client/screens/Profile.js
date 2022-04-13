import React, { useState, useContext, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	Image,
} from 'react-native';
import { AuthContext } from '../context/auth';
import { LinkContext } from '../context/link';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Divider } from '@rneui/base';

const Profile = ({ navigation }) => {
	const [auth, setAuth] = useContext(AuthContext);
	const [link, setLink] = useContext(LinkContext);

	const [userProfile, setUserProfile] = useState({});
	const [userLinks, setUserLinks] = useState([]);

	dayjs.extend(relativeTime);

	const route = useRoute();

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const { data } = await axios.get(
					`/user-profile/${route.params._id}`
				);
				console.log(data);
				setUserProfile(data.profile);
				setUserLinks(data.links);
			} catch (err) {
				console.log(err);
			}
		};
		fetchUserProfile();
	}, []);

	return (
		<ImageBackground
			source={require('../assets/background.jpg')}
			style={styles.background}
			blurRadius={10}
			resizeMode="cover"
		>
			<View style={{ alignItems: 'center' }}>
				<Image
					source={{
						uri: userProfile?.image?.url
							? userProfile.image.url
							: `https://via.placeholder.com/500x500.png?text=${userProfile?.name?.charAt(
									0
							  )}`,
					}}
					style={styles.image}
				/>
			</View>

			<View style={styles.container}>
				<Text style={styles.title}>{userProfile.name}</Text>
				<Text style={styles.role}>{userProfile.role}</Text>
				<Text style={styles.joined}>
					Joined: {dayjs(userProfile.createdAt).fromNow()}
				</Text>
				<Divider width={1} style={{ marginTop: 15 }} />

				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.links}>Posts - {userLinks.length}</Text>

					{userLinks?.map((link) => (
						<View key={link._id} style={styles.container1}>
							<Text>✔ Views - {link?.views}</Text>
							<Text>Title - {link?.urlPreview?.ogTitle}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		flex: 1,
	},
	background: {
		flex: 1,
		height: '100%',
	},
	image: {
		height: 180,
		width: 200,
		borderRadius: 100,
		marginTop: 30,
		marginBottom: 8,
	},
	title: {
		fontSize: 25,
		alignSelf: 'center',
		marginBottom: 2,
	},
	role: {
		fontSize: 12,
		alignSelf: 'center',
	},
	joined: {
		fontSize: 12,
		alignSelf: 'center',
	},
	links: {
		marginTop: 10,
		fontSize: 15,
		alignSelf: 'center',
	},
	container1: {
		alignSelf: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
});

export default Profile;
