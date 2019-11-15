import React, {Component} from 'react';
import classes from './User.module.css';
import {fetchUserById} from "../../store/actions/user";
import {connect} from "react-redux";
import CustomTextField from '../../components/UI/TextField/TextField';

class User extends Component {

	componentDidMount() {
		this.props.fetchUserById(this.props.match.params.id)
	}

	render() {
		return (
			<div className={classes.User}>

				<div className={classes.UserWrapper}>
					<h1>editor</h1>

					{
						this.props.loading || !this.props.user ? <div>l</div> : <CustomTextField
							user={this.props.user}
						/>
					}

				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		loading: state.user.loading,
		user: state.user.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUserById: id => dispatch(fetchUserById(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(User);