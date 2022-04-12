import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Circlelogo = ({ children }) => {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				{children ? (
					children
				) : (
					<Image
						source={require('../../assets/mainimage.png')}
						style={styles.image}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingBottom: 20,
	},
	innerContainer: {
		backgroundColor: '#fff',
		height: 190,
		width: 190,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
	},
	image: {
		width: 180,
		height: 180,
		marginVertical: 30,
	},
});

export default Circlelogo;
