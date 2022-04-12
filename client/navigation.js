import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/auth';
import { LinkProvider } from './context/link';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreensNav from './components/nav/ScreensNav';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<AuthProvider>
					<LinkProvider>
						<ScreensNav />
					</LinkProvider>
				</AuthProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
