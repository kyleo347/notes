import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { login } from '../actions/user-actions';
import { User } from '../model/User';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import { AppState } from '../model/AppState';

const mapStateToProps = (state: AppState) => {
    return {
        authenticated: state.user.authenticated
    }
};

function mapDispatchToProps(dispatch: Function) {
    return {
        login: (user: User) => dispatch(login(user))
    };
}
class ConnectedLogin extends Component<any,User> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    
    componentWillReceiveProps(nextProps: any) {
        if (nextProps.authenticated) {
            this.props.history.push('/');
        }
    }

    onChange = (e : any) => {
        const state: any = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e : any) => {
        e.preventDefault();
        this.props.login(this.state, () => this.props.history.push('/'));
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <FormGroup controlId="username">
                        <ControlLabel className="sr-only">Email address</ControlLabel>
                        <FormControl type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel className="sr-only">Password</ControlLabel>
                        <FormControl type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />
                    </FormGroup>
                    <button className="btn  btn-primary btn-block" type="submit">Login</button>
                    <p>
                        Not a member? <Link to="/register"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Register here</Link>
                    </p>
                </form>
            </div>
        );
    }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);    

export default Login;