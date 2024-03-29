import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/Signup';
import Signin from '../../screens/Signin';
import Home from '../../screens/Home';
import { AuthContext } from '../../context/auth';
import HeaderTabs from './HeaderTabs';
import Account from '../../screens/Account';
import Links from '../../screens/Links';
import ForgotPassword from '../../screens/ForgotPassword';
import PostLink from '../../screens/PostLink';
import LinkView from '../../screens/LinkView';
import Profile from '../../screens/Profile';
import TrendingLinks from '../../screens/TrendingLinks';

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
	const [state, setState] = useContext(AuthContext);

	const authenticated = state && state.token !== '' && state.user !== null;

	return (
		<Stack.Navigator initialRouteName="Signin">
			{authenticated ? (
				<>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{
							title: 'DailyLinks',
							headerRight: () => <HeaderTabs />,
							headerTintColor: '#247881',
						}}
					/>
					<Stack.Screen
						name="Account"
						component={Account}
						options={{
							headerTitleAlign: 'center',
							headerTintColor: '#247881',
						}}
					/>
					<Stack.Screen
						name="Links"
						component={Links}
						options={{
							headerTitleAlign: 'center',
							headerTintColor: '#247881',
						}}
					/>
					<Stack.Screen
						name="PostLink"
						component={PostLink}
						options={{
							title: 'Post',
							headerTitleAlign: 'center',
							headerTintColor: '#247881',
						}}
					/>
					<Stack.Screen
						name="LinkView"
						component={LinkView}
						options={{
							title: '',
							headerTintColor: '#247881',
						}}
					/>
					<Stack.Screen
						name="Profile"
						component={Profile}
						options={({ route }) => ({
							// title: `${route.params.name}'s Profile`,
							title: 'Profile',
							headerTitleAlign: 'center',
							headerTintColor: '#247881',
							// headerTransparent: true,
						})}
					/>
					<Stack.Screen
						name="TrendingLinks"
						component={TrendingLinks}
						options={{
							title: 'Trending',
							headerTitleAlign: 'center',
							headerTintColor: '#247881',
						}}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name="Signin"
						component={Signin}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Signup"
						component={Signup}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="ForgotPassword"
						component={ForgotPassword}
						options={{
							headerShown: false,
						}}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
