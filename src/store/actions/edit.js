import axios from '../../axios/axios-users-app';

export function finishEditUser(data, id) {
	return async () => {
		await axios.put(`/users/${id}`, data);
	}
}