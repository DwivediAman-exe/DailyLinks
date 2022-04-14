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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Profile = () => {
	const [auth, setAuth] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);

	const [userProfile, setUserProfile] = useState({});
	const [userLinks, setUserLinks] = useState([]);
	const [loading, setLoading] = useState(true);

	dayjs.extend(relativeTime);

	const route = useRoute();
	const routeParamsId = route?.params?._id;

	useEffect(() => {
		const fetchUserProfile = async (userId) => {
			try {
				const { data } = await axios.get(`/user-profile/${userId}`);
				// console.log(data);
				setUserProfile(data.profile);
				setUserLinks(data.links);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			} catch (err) {
				console.log(err);
			}
		};
		routeParamsId
			? fetchUserProfile(routeParamsId)
			: fetchUserProfile(auth.user._id);
	}, []);

	const handleDelete = async (linkId) => {
		// console.log("delete", linkId);
		try {
			const { data } = await axios.delete(`/link-delete/${linkId}`);
			console.log('data', data);
			// update userLinks
			setUserLinks((links) => {
				const index = userLinks.findIndex((l) => l._id === linkId);
				userLinks.splice(index, 1);
				return [...links];
			});
			// update context
			setLinks((links) => {
				const index = links.findIndex((l) => l._id === linkId);
				links.splice(index, 1);
				return [...links];
			});
			alert('🐸 Deleted successfully!');
		} catch (err) {
			console.log(err);
			alert('🐸 Delete failed');
		}
	};

	if (loading) {
		return (
			<View
				style={{
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#fff',
				}}
			>
				<Image
					source={require('../assets/loading.gif')}
					style={styles.loading}
				/>
			</View>
		);
	}

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
							<Text>Title - {link?.urlPreview?.ogTitle}</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Text>✔ Views - {link?.views}</Text>
								{auth?.user?._id === link?.postedBy?._id && (
									<TouchableOpacity
										onPress={() => handleDelete(link._id)}
									>
										<FontAwesome5
											size={15}
											name="trash"
											color="#ff9900"
											style={{ paddingLeft: 10 }}
										/>
									</TouchableOpacity>
								)}
							</View>
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
	loading: {
		height: 100,
		width: 100,
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
