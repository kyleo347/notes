import React, { Component } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";
import styles from  "../css/NoteNavbar.module.css";
import { AppState } from "../model/AppState";
import { logout } from "../actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const mapStateToProps = (state: AppState) => {
    return {
        authenticated: state.authenticated
    }
};

function mapDispatchToProps(dispatch: Function) {
    return {
        logout: () => dispatch(logout())
    };
}

export class ConnectedNavbar extends Component<any,any> {
    render() {
        let authButtons = 
        <Nav pullRight>
            <NavItem eventKey={1} >
                <Link to="/login" >
                    <Button bsStyle="primary">Login</Button>
                </Link>
            </NavItem>;
            
            <NavItem eventKey={2}>
                <Link to="/register">
                <Button >Register</Button>
                </Link>
            </NavItem>
        </Nav>
        if (this.props.authenticated) {
            authButtons = <Nav pullRight>
                            <NavItem eventKey={1} onClick={this.props.logout}>
                                <Button>Log out</Button>
                            </NavItem>
                        </Nav>
        }
        return (
            <Navbar inverse collapseOnSelect className={styles["note-navbar"]}>
                <Navbar.Header className="d-flex align-items-center">
                    <Navbar.Brand >
                        <Link to="/">Notes</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {authButtons}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const NoteNavbar = connect(mapStateToProps,mapDispatchToProps)(ConnectedNavbar);

export default NoteNavbar;