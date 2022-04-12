import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const PreviewCard = ({
	ogTitle = 'Untitled',
	ogDescription = 'No description found...',
	ogImage = 'https://via.placeholder.com/500x500.png?text=Image',
}) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: ogImage.url }} />

			<TouchableOpacity>
				<View style={{ padding: 5, height: 150 }}>
					<Text style={{ paddingTop: 5, paddingBottom: 5 }}>
						{ogTitle}
					</Text>
					<Text style={{ fontSize: 10 }}>{ogDescription}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '92%',
		height: 300,
		borderRadius: 14,
		shadowColor: '#171717',
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5,
		marginBottom: 20,
		paddingBottom: 2,
		alignItems: 'center',
	},
	image: {
		height: '70%',
		width: '100%',
		borderTopRightRadius: 14,
		borderTopLeftRadius: 14,
	},
});

export default PreviewCard;
