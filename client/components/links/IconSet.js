import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const IconSet = ({
	handleLikePress,
	handleUnLikePress,
	showIcons,
	link,
	auth,
}) => {
	return (
		<>
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

					{link?.likes?.includes(auth?.user?._id) ? (
						<TouchableOpacity
							style={styles.heart}
							onPress={() => handleUnLikePress(link)}
						>
							<FontAwesome5
								name="heart"
								solid
								style={styles.icon}
								size={18}
							/>
							<Text style={styles.text}>{link.likes.length}</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.heart}
							onPress={() => handleLikePress(link)}
						>
							<FontAwesome5
								name="hand-holding-heart"
								style={styles.icon}
								size={18}
							/>
							<Text style={styles.text}>{link.likes.length}</Text>
						</TouchableOpacity>
					)}
				</>
			)}
		</>
	);
};

const styles = StyleSheet.create({
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

export default IconSet;
