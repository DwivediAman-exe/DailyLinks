import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

const UserInput = ({
	name,
	value,
	setValue,
	autoCapitalize = 'none',
	keyboardType = 'default',
	secureTextEntry = false,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{name}</Text>
			<TextInput
				style={styles.input}
				autoCorrect={false}
				value={value}
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				onChangeText={(text) => setValue(text)}
			></TextInput>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 24,
		marginBottom: 25,
	},
	label: {
		fontSize: 16,
		color: '#000',
	},
	input: {
		borderBottomColor: '#234234',
		borderBottomWidth: 0.6,
		fontSize: 15,
		color: '#733C3C',
		height: 32,
	},
});

export default UserInput;
