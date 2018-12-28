import React, { Component } from "react";
import { Grid, Row, Col, Button, Well } from "react-bootstrap";
import NoteList from "./NoteList";
import NoteForm from "./NoteDetail";
import { AppState } from "../model/AppState";
import { Note } from "../model/Note";
import { connect } from "react-redux";
import { loggedIn } from "../actions/user-actions";
import { getAllNotes } from "../actions/note-actions";
import { Link } from "react-router-dom";

const mapStateToProps = (state: AppState) => {
    return {
        authenticated: state.user.authenticated,
        selected: state.notes.selected
    }
};

function mapDispatchToProps(dispatch: Function) {
    return {
        getAllNotes: () => dispatch(getAllNotes())
    };
}

class ConnectedApp extends Component<any, Note> {
    constructor(props: any) {
        super(props);
        if (this.props.authenticated) {
            this.props.getAllNotes();
        }
    }

    render() {
        if (!this.props.authenticated) {
            return (
                <Grid>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <Well className="m-5">
                                <h4>Please Log in to see your notes</h4>
                                <Link to="/login">
                                    <Button bsStyle="primary">Log In</Button>
                                </Link>
                            </Well>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </Grid>
            )
        }
        let noteForm = () => {
            if (this.props.selected) {
                return <NoteForm key={this.props.selected._id}></NoteForm>
            }
        }
        return (
            <Grid >
                <Row>
                    <Col md={6}>
                        <NoteList></NoteList>
                    </Col>
                    <Col md={6}>
                        {noteForm()}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;