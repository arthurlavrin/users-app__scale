import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import User from './containers/User/User';
import UserList from './containers/UserList/UserList';
import Auth from './containers/Auth/Auth';
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";


class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
        <Switch>
          <Route exact path='/log-in' component={Auth} />
          <Redirect to={'/log-in'}/>
        </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path='/user/:id/edit' component={User} />
            <Route path="/logout" component={Logout}/>
            <Route path='/users' exact component={UserList} />
            <Redirect to={'/users'}/>
          </Switch>
      )
    }

    return (
        <Layout>
          { routes }
        </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
