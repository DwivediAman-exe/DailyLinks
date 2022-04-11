import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const Tab = ({ name, icon }) => {
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
				/>
				<Text>{name}</Text>
			</>
		</TouchableOpacity>
	);
};

const FooterTabs = (props) => {
	return (
		<View style={styles.container}>
			<Tab name="Home" icon="home" />
			<Tab name="Post" icon="plus-circle" />
			<Tab name="Links" icon="list-ul" />
			<Tab name="Account" icon="user-cog" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginVertical: 12,
		marginHorizontal: 30,
		justifyContent: 'space-between',
	},
});

export default FooterTabs;
