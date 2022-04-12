import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../config';
import { useNavigation } from '@react-navigation/native';

// creating context
const AuthContext = createContext();

// provider
const AuthProvider = ({ children }) => {
	const [state, setState] = useState({
		user: null,
		token: '',
	});

	const navigation = useNavigation();

	const token = state && state.token ? state.token : '';

	// configure axios URL
	axios.defaults.baseURL = API;
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	// handling the expired token
	axios.interceptors.response.use(
		async function (response) {
			return response;
		},
		async function (error) {
			let res = error.response;
			if (
				res.status === 401 &&
				res.config &&
				!res.config.__isRetryRequest
			) {
				await AsyncStorage.removeItem('@auth');
				setState({ user: null, token: '' });
				navigation.navigate('Signin');
			}
		}
	);

	useEffect(() => {
		// getting data from async storage
		const loadFromAsyncStorage = async () => {
			let data = await AsyncStorage.getItem('@auth');
			const as = JSON.parse(data);

			// setting global context with user and state
			setState({ ...state, user: as.user, token: as.token });
		};
		loadFromAsyncStorage();
	}, []);

	// providing state to be used by all other componenents
	return (
		<AuthContext.Provider value={[state, setState]}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
