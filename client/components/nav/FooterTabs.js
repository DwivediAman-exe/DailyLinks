import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider } from '@rneui/base';

export const Tab = ({ name, text, handlePress, screenName, routeName }) => {
	const activeScreenColor = screenName === routeName ? '#fff' : '#86C6F4';
	const activeBackgroundPillColor =
		screenName === routeName ? '#fff' : '#86C6F4';

	return (
		<TouchableOpacity onPress={handlePress}>
			<FontAwesome5
				name={name}
				size={25}
				style={{
					marginBottom: 3,
					alignSelf: 'center',
				}}
				color={activeScreenColor}
			/>
			<Text style={{ color: `${activeBackgroundPillColor}` }}>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

const FooterTabs = () => {
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<>
			<Divider />
			<View style={styles.container}>
				<Tab
					text="Home"
					name="home"
					screenName="Home"
					routeName={route.name}
					handlePress={() => navigation.navigate('Home')}
				/>
				<Tab
					text="Post"
					name="plus-circle"
					screenName="PostLink"
					routeName={route.name}
					handlePress={() => navigation.navigate('PostLink')}
				/>
				<Tab
					text="Links"
					name="list-ul"
					screenName="Links"
					routeName={route.name}
					handlePress={() => navigation.navigate('Profile')}
				/>
				<Tab
					text="Account"
					name="user-cog"
					screenName="Account"
					routeName={route.name}
					handlePress={() => navigation.navigate('Account')}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 30,
		paddingVertical: 8,
		justifyContent: 'space-between',
	},
});

export default FooterTabs;
