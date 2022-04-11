import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/Signup';
import Signin from '../../screens/Signin';
import Home from '../../screens/Home';
import { AuthContext } from '../../context/auth';
import HeaderTabs from './HeaderTabs';
import Account from '../../screens/Account';
import Post from '../../screens/Post';
import Links from '../../screens/Links';

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
	const [state, setState] = useContext(AuthContext);

	const authenticated = state && state.token !== '' && state.user !== null;

	// console.log('Authenticated', authenticated);

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
						name="Post"
						component={Post}
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
				</>
			)}
		</Stack.Navigator>
	);
}
