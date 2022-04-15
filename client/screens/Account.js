import React, { useState, useContext, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import SubmitButton from '../components/auth/SubmitButton';
import UserInput from '../components/auth/UserInput';
import axios from 'axios';
import Circlelogo from '../components/auth/Circlelogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';

const Account = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [image, setImage] = useState({ url: '', public_id: '' });
	const [uploadImage, setUploadImage] = useState('');

	const [state, setState] = useContext(AuthContext);

	useEffect(() => {
		const { name, email, image, role } = state.user;
		setName(name);
		setEmail(email);
		setRole(role);
		setImage(image);
	}, [state]);

	const handleSubmit = async () => {
		setLoading(true);

		try {
			const { data } = await axios.post('/update-password', { password });

			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				alert('Password update successfully');
				setLoading(false);
				setPassword('');
			}
		} catch (err) {
			console.log(err);
			alert('Password update failed! Try again.');
			setLoading(false);
		}
	};

	const handleUpload = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		// console.log(permissionResult);
		// return;
		if (permissionResult.granted === false) {
			alert('Camera access is required');
			return;
		}
		// get image from image
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
		});
		// console.log("PICKER RESULT => ", pickerResult);
		if (pickerResult.cancelled === true) {
			return;
		}
		// save to state for preview
		let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
		setUploadImage(base64Image);
		// send to backend for uploading to cloudinary

		const { data } = await axios.post('/upload-image', {
			image: base64Image,
		});
		console.log('UPLOADED RESPONSE => ', data);
		// update async storage
		const as = JSON.parse(await AsyncStorage.getItem('@auth')); // {user: {}, token: ''}
		as.user = data;
		await AsyncStorage.setItem('@auth', JSON.stringify(as));
		// update context
		setState({ ...state, user: data });
		setImage(data.image);
		alert('👍 Profile image saved');
	};

	const signOut = async () => {
		setState({ user: null, token: '' });
		await AsyncStorage.removeItem('@auth');
	};

	return (
		<ImageBackground
			source={require('../assets/loginbackground.png')}
			style={styles.background}
			blurRadius={1}
			resizeMode="cover"
		>
			<KeyboardAwareScrollView contentContainerStyle={styles.container}>
				<View>
					<Circlelogo>
						{image && image.url ? (
							<Image
								source={{ uri: image.url }}
								style={styles.image}
							/>
						) : uploadImage ? (
							<Image
								source={{ uri: uploadImage }}
								style={styles.image}
							/>
						) : (
							<TouchableOpacity onPress={() => handleUpload()}>
								<FontAwesome5
									name="camera"
									size={45}
									color="orange"
								/>
							</TouchableOpacity>
						)}
					</Circlelogo>

					{image && image.url ? (
						<TouchableOpacity onPress={() => handleUpload()}>
							<FontAwesome5
								name="camera"
								size={30}
								color="orange"
								style={{
									alignSelf: 'center',
									marginTop: -10,
									marginBottom: 10,
								}}
							/>
						</TouchableOpacity>
					) : (
						<></>
					)}

					<View>
						<Text style={styles.title}>{name}</Text>
						<Text style={styles.subinfo}>{email}</Text>
						<Text style={styles.m}>{role}</Text>
					</View>

					<UserInput
						name="Update Password"
						value={password}
						setValue={setPassword}
						secureTextEntry={true}
						autoCompleteType="password"
					/>

					<SubmitButton
						title="Update Password"
						handleSubmit={handleSubmit}
						loading={loading}
					/>

					<SubmitButton
						title="Sign Out"
						handleSubmit={signOut}
						loading={loading}
					/>
				</View>
			</KeyboardAwareScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		paddingTop: 30,
	},
	background: {
		flex: 1,
		height: '100%',
	},
	image: {
		height: 180,
		width: 180,
		borderRadius: 100,
	},
	title: {
		fontSize: 25,
		alignSelf: 'center',
		marginBottom: 8,
		color: '#CC704B',
		fontWeight: 'bold',
	},
	subinfo: {
		color: '#CC704B',
		fontWeight: 'bold',
		alignSelf: 'center',
		fontSize: 16,
		marginBottom: 8,
	},
	m: {
		color: '#CC704B',
		fontWeight: 'bold',
		alignSelf: 'center',
		fontSize: 16,
		marginBottom: 40,
	},
});

export default Account;
