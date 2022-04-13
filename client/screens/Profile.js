import React, { useState, useContext, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
} from 'react-native';
import { AuthContext } from '../context/auth';
import { LinkContext } from '../context/link';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const Profile = ({ navigation }) => {
	const [auth, setAuth] = useContext(AuthContext);
	const [link, setLink] = useContext(LinkContext);

	const [userProfile, setUserProfile] = useState({});

	const route = useRoute();

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const { data } = await axios.get(
					`/user-profile/${route.params._id}`
				);
				console.log(data);
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
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text>
						Profile Page {JSON.stringify(route.params, null, 4)}
					</Text>
				</ScrollView>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	background: {
		flex: 1,
		height: '100%',
	},
	title: {
		fontSize: 20,
		alignSelf: 'center',
		paddingTop: 20,
		marginBottom: 30,
	},
});

export default Profile;
