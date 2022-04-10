import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SubmitButton from '../components/auth/SubmitButton';
import UserInput from '../components/auth/UserInput';
import axios from 'axios';
import Circlelogo from '../components/auth/Circlelogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signup = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);

		// validation
		if (!name || !email || !password) {
			alert('Please fill all the required fields');
			return;
		}

		try {
			const { data } = await axios.post(
				'http://localhost:8000/api/signup',
				{ name, email, password }
			);
			console.log('Registration successfull', data);
			alert('Sign Up successfull');
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container}>
			<View>
				<Circlelogo />
				<Text style={styles.title}>Sign Up</Text>

				<UserInput
					name="Name"
					value={name}
					setValue={setName}
					autoCapitalize="words"
					autoCorrect={false}
					autoCompleteType="name"
				/>
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
					title="signup"
					handleSubmit={handleSubmit}
					loading={loading}
				/>

				<Text style={styles.bottomtext}>
					Already a registered user?{' '}
					<Text
						style={styles.bottomtextchild}
						onPress={() => navigation.navigate('Signin')}
					>
						Sign In
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
		fontSize: 13,
	},
	bottomtextchild: {
		color: '#A2D2FF',
		fontWeight: 'bold',
		fontSize: 14,
	},
});

export default Signup;
