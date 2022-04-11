import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreensNav from './components/nav/ScreensNav';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<AuthProvider>
					<ScreensNav />
				</AuthProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
