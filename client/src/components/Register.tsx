import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';
import { register } from '../actions/actions';
import { User } from '../model/User';
import { connect } from 'react-redux';
import { AppState } from '../model/AppState';

const mapStateToProps = (state: AppState) => {
    return {
        registered: state.registered
    }
};

function mapDispatchToProps(dispatch: Function) {
    return {
        register: (user: User) => dispatch(register(user))
    };
}

interface State{
    username: string,
    password: string,
    passwordVerify: string,
}

class ConnectedRegister extends Component<any,State> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordVerify: '',
        };
    }

    onChange = (e: any) => {
        const state: any = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        this.props.register(this.state);
    }

    render() {
        if (this.props.registered) {
            return ( 
            <Alert bsStyle="success">
                Successfully registered<br></br>
                <Link to="/login"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Sign in here</Link>
            </Alert>
            )
        }
        const match = this.state.password === this.state.passwordVerify;
        return (
            <div className="container">
                <form className="form-register" onSubmit={this.onSubmit}>
                    <h2 className="form-register-heading">Please sign in</h2>
                    <FormGroup controlId="username">
                        <ControlLabel htmlFor="inputEmail" className="sr-only">Email address</ControlLabel>
                        <FormControl type="email" className="form-control" placeholder="Email address" name="username" value={this.state.username} onChange={this.onChange} required />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel htmlFor="inputPassword" className="sr-only">Password</ControlLabel>
                        <FormControl type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} required />
                    </FormGroup>
                    <FormGroup controlId="passwordVerify">
                        <ControlLabel htmlFor="inputVerify" className="sr-only">Verify</ControlLabel>
                        <FormControl type="password" className="form-control" placeholder="Verify Password" name="passwordVerify" value={this.state.passwordVerify} onChange={this.onChange} required />
                    </FormGroup>
                    <Alert bsStyle="danger" hidden={match}>Passwords must match</Alert>
                    <button className="btn  btn-primary btn-block" type="submit">Register</button>
                    <p>
                        Already a member? <Link to="/login"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Sign in here</Link>
                    </p>
                </form>
            </div>
        );
    }
}

const Register = connect(mapStateToProps, mapDispatchToProps)(ConnectedRegister);    

export default Register;