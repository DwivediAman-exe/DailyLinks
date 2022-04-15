import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Search = ({ value, setValue }) => {
	return (
		<TextInput
			style={styles.input}
			value={value}
			onChangeText={(text) => setValue(text)}
			placeholder="Search Links"
			autoCapitalize="none"
		></TextInput>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 50,
		paddingHorizontal: 20,
		marginHorizontal: 15,
		marginTop: 20,
		borderRadius: 50,
		borderWidth: 5,
		color: '#000',
		borderColor: '#d9d9d9',
		backgroundColor: '#e6e6e6',
	},
});

export default Search;
