import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// creating context
const AuthContext = createContext();

// provider
const AuthProvider = ({ children }) => {
	const [state, setState] = useState({
		user: null,
		token: '',
	});

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
