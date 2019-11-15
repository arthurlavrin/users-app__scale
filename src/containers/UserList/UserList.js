import React, {Component}  from 'react';
import classes from './UserList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import Table from '../../components/UI/Table/Table';
import {connect} from 'react-redux';
import {fetchUsers} from "../../store/actions/user";




class UserList extends Component {

	componentDidMount() {
		this.props.fetchUsers()
	}

	render() {
		return(
			<div className={classes.UserList}>
				<div>
					<h1>List of users</h1>

					{ this.props.loading && this.props.users.length !== 0
						? <Loader />
						: <Table users={this.props.users} />
					}

				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		users: state.user.users,
		loading: state.user.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUsers: () => dispatch(fetchUsers())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);