import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubmitButton = ({ title, handleSubmit, loading = false }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={handleSubmit}>
			<Text style={styles.title}>
				{loading ? 'Please wait...' : title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFC300',
		height: 50,
		marginBottom: 20,
		marginTop: 10,
		justifyContent: 'center',
		marginHorizontal: 50,
		borderRadius: 100,
	},
	title: {
		alignSelf: 'center',
		fontSize: 18,
	},
});

export default SubmitButton;
