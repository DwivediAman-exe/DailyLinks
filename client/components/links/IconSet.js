import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

const IconSet = ({
	handleLikePress,
	handleUnLikePress,
	showIcons,
	link,
	auth,
}) => {
	dayjs.extend(relativeTime);
	const navigation = useNavigation();

	return (
		<>
			{showIcons && (
				<>
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
							<Text style={styles.text}>
								{link?.likes?.length}
							</Text>
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
							<Text style={styles.text}>
								{link?.likes?.length}
							</Text>
						</TouchableOpacity>
					)}

					<View style={styles.eye}>
						<FontAwesome5
							name="eye"
							style={styles.icon}
							size={18}
						/>
						<Text style={styles.text}>{link.views}</Text>
					</View>

					<View style={styles.clock}>
						<FontAwesome5
							name="clock"
							solid
							style={styles.icon}
							size={18}
						/>
						<Text style={styles.text}>
							{dayjs(link.createdAt).fromNow()}
						</Text>
					</View>

					<View style={styles.user}>
						<FontAwesome5
							onPress={() =>
								navigation.navigate('Profile', {
									name: link.postedBy?.name,
									_id: link.postedBy?._id,
								})
							}
							name="user-circle"
							solid
							style={styles.icon}
							size={18}
						/>
						<Text style={styles.text}>{link.postedBy?.name}</Text>
					</View>
				</>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	eye: {
		position: 'absolute',
		left: 20,
		top: 10,
	},
	user: {
		position: 'absolute',
		right: 20,
		top: 10,
	},
	clock: {
		position: 'absolute',
		right: 80,
		top: 10,
	},
	heart: {
		position: 'absolute',
		left: 80,
		top: 10,
	},
	icon: {
		color: '#FD5D5D',
		shadowColor: '#000',
		shadowOpacity: 2,
		textShadowRadius: 5,
		textShadowOffset: { width: 2, height: 1 },
	},
	text: {
		color: '#FD5D5D',
		alignSelf: 'center',
	},
});

export default IconSet;
