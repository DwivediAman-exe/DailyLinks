import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider } from '@rneui/base';

export const Tab = ({ name, text, handlePress, screenName, routeName }) => {
	const activeScreenColor = screenName === routeName && '#F76E11';

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
			<Text>{text}</Text>
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
					handlePress={() => navigation.navigate('Links')}
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
		marginVertical: 8,
		marginHorizontal: 30,
		justifyContent: 'space-between',
	},
	activetab: {},
});

export default FooterTabs;
