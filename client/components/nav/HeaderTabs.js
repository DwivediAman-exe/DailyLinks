import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const HeaderTabs = (props) => {
	const [state, setState] = useContext(AuthContext);

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate('TrendingLinks')}
			>
				<FontAwesome5 name="bell" size={25} color="#247881" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default HeaderTabs;
