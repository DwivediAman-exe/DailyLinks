import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PreviewCard = ({
	ogTitle = 'Untitled',
	ogDescription = 'No description found...',
	ogImage = 'https://via.placeholder.com/500x500.png?text=NoPreviewImage',
	handlePress = (f) => f,
	link = {},
	showIcons = false,
}) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: ogImage.url }} />

			{showIcons && (
				<>
					<View style={styles.eye}>
						<FontAwesome5
							name="eye"
							style={styles.icon}
							size={18}
						/>
						<Text style={styles.text}>{link.views}</Text>
					</View>

					<TouchableOpacity style={styles.heart}>
						<FontAwesome5
							name="heart"
							style={styles.icon}
							size={18}
						/>
						<Text style={styles.text}>{link.likes.length}</Text>
					</TouchableOpacity>
				</>
			)}

			<TouchableOpacity onPress={() => handlePress(link)}>
				<View style={{ padding: 5, height: 150 }}>
					<Text
						ellipsizeMode="tail"
						numberOfLines={2}
						style={{ paddingTop: 3, paddingBottom: 3 }}
					>
						{ogTitle}
					</Text>
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={{ fontSize: 10 }}
					>
						{ogDescription}
					</Text>
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
		marginBottom: 35,
		paddingBottom: 2,
		alignItems: 'center',
	},
	image: {
		height: '70%',
		width: '100%',
		borderTopRightRadius: 14,
		borderTopLeftRadius: 14,
	},
	eye: {
		position: 'absolute',
		right: 20,
		top: 10,
	},
	icon: {
		color: '#FD5D5D',
	},
	text: {
		color: '#FD5D5D',
		alignSelf: 'center',
	},
	heart: {
		position: 'absolute',
		right: 80,
		top: 10,
	},
});

export default PreviewCard;
