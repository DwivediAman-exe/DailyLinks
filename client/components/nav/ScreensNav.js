import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/Signup';
import Signin from '../../screens/Signin';
import Home from '../../screens/Home';
import { AuthContext } from '../../context/auth';

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
	const [state, setState] = useContext(AuthContext);

	const authenticated = state && state.token !== '' && state.user !== null;

	// console.log('Authenticated', authenticated);

	return (
		<Stack.Navigator
			initialRouteName="Signin"
			screenOptions={{
				headerShown: false,
			}}
		>
			{authenticated ? (
				<Stack.Screen name="Home" component={Home} />
			) : (
				<>
					<Stack.Screen name="Signup" component={Signup} />
					<Stack.Screen name="Signin" component={Signin} />
				</>
			)}
		</Stack.Navigator>
	);
}
