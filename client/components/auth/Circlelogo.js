import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Circlelogo = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/mainimage.png')}
				style={styles.image}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 180,
		height: 180,
		marginVertical: 30,
	},
});

export default Circlelogo;
