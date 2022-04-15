import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import SubmitButton from '../components/auth/SubmitButton';
import UserInput from '../components/auth/UserInput';
import axios from 'axios';
import Circlelogo from '../components/auth/Circlelogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';

const Signin = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [state, setState] = useContext(AuthContext);

	const handleSubmit = async () => {
		setLoading(true);

		// validation
		if (!email || !password) {
			alert('Please fill all the required fields');
			setLoading(false);
			return;
		}

		try {
			const { data } = await axios.post(`/signin`, {
				email,
				password,
			});

			// if error
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				// save response data in async storage
				await AsyncStorage.setItem('@auth', JSON.stringify(data));

				// Update Global context
				setState(data);

				console.log('SignIn successfull', data);
				alert('Sign In successfull');
				setLoading(false);

				// redirect
				navigation.navigate('Home');
			}
		} catch (err) {
			console.log(err);
			alert('Sign In failed! Try again.');
			setLoading(false);
		}
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
					<Circlelogo />
					<Text style={styles.title}>Sign In</Text>

					<UserInput
						name="Email"
						value={email}
						setValue={setEmail}
						autoCompleteType="email"
						keyboardType="email-address"
					/>
					<UserInput
						name="Password"
						value={password}
						setValue={setPassword}
						secureTextEntry={true}
						autoCompleteType="password"
					/>

					<SubmitButton
						title="signin"
						handleSubmit={handleSubmit}
						loading={loading}
					/>

					<Text style={styles.bottomtext}>
						Don't have a account?{' '}
						<Text
							style={styles.bottomtextchild}
							onPress={() => navigation.navigate('Signup')}
						>
							Sign Up
						</Text>
					</Text>

					<Text style={styles.bottomtext}>
						Forgot Password?{' '}
						<Text
							onPress={() =>
								navigation.navigate('ForgotPassword')
							}
							style={styles.bottomtextchild}
						>
							Click here
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	background: {
		flex: 1,
		height: '100%',
	},
	title: {
		fontSize: 25,
		alignSelf: 'center',
		marginBottom: 40,
		color: '#86C6F4',
		fontWeight: 'bold',
	},
	bottomtext: {
		color: '#fff',
		alignSelf: 'center',
		marginTop: 10,
		fontSize: 14,
	},
	bottomtextchild: {
		color: '#A2D2FF',
		fontWeight: 'bold',
		fontSize: 15,
	},
});

export default Signin;
