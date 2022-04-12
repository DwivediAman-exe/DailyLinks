import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SubmitButton from '../components/auth/SubmitButton';
import UserInput from '../components/auth/UserInput';
import axios from 'axios';
import Circlelogo from '../components/auth/Circlelogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';

const ForgotPassword = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [state, setState] = useContext(AuthContext);

	const handleSubmit = async () => {
		setLoading(true);

		if (!email) {
			alert('Email is required !');
			setLoading(false);
			return;
		}

		try {
			const { data } = await axios.post('/forgot-password', {
				email,
			});

			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				console.log('reset password response', data);
				alert('Enter the reset code sent in your email');
				setLoading(false);
			}
		} catch (err) {
			alert('Error sending Email! Try again');
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container}>
			<View>
				<Circlelogo />
				<Text style={styles.title}>Forgot Password</Text>

				<UserInput
					name="Email"
					value={email}
					setValue={setEmail}
					autoCompleteType="email"
					keyboardType="email-address"
				/>
				{/* <UserInput
					name="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry={true}
					autoCompleteType="password"
				/> */}

				<SubmitButton
					title="Request Reset"
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

export default ForgotPassword;
