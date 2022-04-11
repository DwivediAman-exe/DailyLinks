import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SubmitButton from '../components/auth/SubmitButton';
import UserInput from '../components/auth/UserInput';
import axios from 'axios';
import Circlelogo from '../components/auth/Circlelogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../config';

const Signin = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);

		// validation
		if (!email || !password) {
			alert('Please fill all the required fields');
			setLoading(false);
			return;
		}

		try {
			const { data } = await axios.post(`${API}/signin`, {
				email,
				password,
			});

			// if error
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				console.log('SignIn successfull', data);
				alert('Sign In successfull');
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			alert('Sign In failed! Try again.');
			setLoading(false);
		}
	};

	return (
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
					<Text style={styles.bottomtextchild}>Click here</Text>
				</Text>
			</View>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 25,
		alignSelf: 'center',
		marginBottom: 40,
		color: '#019267',
		fontWeight: 'bold',
	},
	bottomtext: {
		alignSelf: 'center',
		marginTop: 10,
		fontSize: 13,
	},
	bottomtextchild: {
		color: '#A2D2FF',
		fontWeight: 'bold',
		fontSize: 14,
	},
});

export default Signin;
