import axios from '../../axios/axios-users-app';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
	return async dispatch => {

		const authData = {
			email,	password
		};

		let url = 'register';

		if (isLogin) {
			url = 'login'
		}

		const response = await axios.post(url, authData);
		const data = response.data;

		const expiresIn = '3600';

		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

		localStorage.setItem('token', data.token);
		localStorage.setItem('userId', data.id);
		localStorage.setItem('expirationDate', expirationDate);

		dispatch(authSuccess(data.token));
		dispatch(autoLogout(expiresIn))
		}
}

export function autoLogout(time) {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, time * 1000)
	}
}

export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expirationDate');
	return {
		type: AUTH_LOGOUT
	}
}

export function autoLogin() {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout())
			} else {
				dispatch(authSuccess(token));
				dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
			}
		}
	}
}

export function authSuccess(token) {
	return {
		type: AUTH_SUCCESS,
		token
	}
}