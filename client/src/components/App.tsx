import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button } from "react-bootstrap";
import NoteList from "./NoteList";
import NoteForm from "./NoteDetail";
import { AppState } from "../model/AppState";
import { Note } from "../model/Note";
import { connect } from "react-redux";
import { getAllNotes } from "../actions/actions";
import { Link } from "react-router-dom";

const mapStateToProps = (state: AppState) => {
    return {
        authenticated: state.authenticated,
        selected: state.selected
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
                <Jumbotron>
                    <h4>Please Log in to see your notes</h4>
                    <Link to="/login">
                        <Button bsClass="primary">Log In</Button>
                    </Link>
                </Jumbotron>
            )
        }
        let noteForm = () => {
            if (this.props.selected) {
                return <NoteForm key={this.props.selected.id}></NoteForm>
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