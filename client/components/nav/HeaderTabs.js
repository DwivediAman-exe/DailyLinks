import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderTabs = (props) => {
	const [state, setState] = useContext(AuthContext);

	const signOut = async () => {
		// removing user and token from Global context and Asyncstorage
		setState({ token: '', user: null });

		await AsyncStorage.removeItem('@auth');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={signOut}>
				<FontAwesome5 name="sign-out-alt" size={25} color="#ff9900" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default HeaderTabs;
