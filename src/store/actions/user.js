import axios from '../../axios/axios-users-app';
import {
	FETCH_USER_SUCCESS,
	FETCH_USERS_ERROR,
	FETCH_USERS_START,
	FETCH_USERS_SUCCESS,
} from "./actionTypes";

export function fetchUsers() {
	return async dispatch => {
		dispatch(fetchUsersStart());
		try {
			const response = await axios.get('/users');
			console.log(response);

			const users = [...response.data.data];

			dispatch(fetchUsersSuccess(users))
		} catch (e) {
			dispatch(fetchUsersError(e))
		}
	}
}

export function fetchUserById(userId) {
	return async dispatch => {
		dispatch(fetchUsersStart());
		try {
			const response = await axios.get(`/users/${userId}`);
			const user = response.data.data;

			dispatch(fetchUserSuccess(user))
		} catch (e) {
			dispatch(fetchUsersError(e))
		}
	}

}

export function fetchUserSuccess(user) {
	return {
		user,
		type: FETCH_USER_SUCCESS
	}
}

export function fetchUsersStart() {
	return {
		type: FETCH_USERS_START
	}
}

export function fetchUsersSuccess(users) {
	return {
		type: FETCH_USERS_SUCCESS,
		users
	}
}

export function fetchUsersError(e) {
	return {
		type: FETCH_USERS_ERROR,
		error: e
	}
}
