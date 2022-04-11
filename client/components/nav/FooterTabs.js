import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/base';

export const Tab = ({ name, icon, handlePress }) => {
	return (
		<TouchableOpacity>
			<>
				<FontAwesome5
					name={icon}
					size={25}
					style={{
						marginBottom: 3,
						alignSelf: 'center',
						color: '#F76E11',
					}}
					onPress={handlePress}
				/>
				<Text>{name}</Text>
			</>
		</TouchableOpacity>
	);
};

const FooterTabs = () => {
	const navigation = useNavigation();

	return (
		<>
			<Divider />
			<View style={styles.container}>
				<Tab
					name="Home"
					icon="home"
					handlePress={() => navigation.navigate('Home')}
				/>
				<Tab
					name="Post"
					icon="plus-circle"
					handlePress={() => navigation.navigate('Post')}
				/>
				<Tab
					name="Links"
					icon="list-ul"
					handlePress={() => navigation.navigate('Links')}
				/>
				<Tab
					name="Account"
					icon="user-cog"
					handlePress={() => navigation.navigate('Account')}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginVertical: 8,
		marginHorizontal: 30,
		justifyContent: 'space-between',
	},
});

export default FooterTabs;
