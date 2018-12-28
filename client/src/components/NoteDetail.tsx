import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { editNote, addNote } from "../actions/note-actions";
import { Note } from "../model/Note";
import { AppState } from "../model/AppState";
import { FormGroup, ControlLabel, FormControl, Alert } from "react-bootstrap";

const mapStateToProps = (state: AppState) => {
    return {
        note: state.notes.selected,
        error: state.error
    }
};

function mapDispatchToProps(dispatch: Function) {
    return {
        editNote: (note: Note) => dispatch(editNote(note)),
        addNote: (note: Note) => dispatch(addNote(note))
    };
}


class ConnectedNote extends Component<any, Note> {
    constructor(props: any) {
        super(props);

        this.state = { ...props.note };

        this.titleChange = this.titleChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    titleChange(event: any) {
        this.setState({ title: event.target.value });
    }

    
    textChange(event: any) {
        this.setState({ text: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        if (!this.state._id || this.state._id === 'new') {
            // const id = uuidv1();
            this.props.addNote({
                // id: id,
                title: this.state.title,
                text: this.state.text
            });
            // this.setState({id : id})
        } else {
            this.props.editNote(this.state);
        }
        // this.note = new Note;
        // this.setState({ title: "" });
    }

    render() {
        const alert = this.props.error ? <Alert><h3>{this.props.error}</h3></Alert> : ''
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="formGroup">
                    <FormGroup controlId="title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.title}
                            placeholder="Enter text"
                            onChange={this.titleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="text">
                        <ControlLabel>Note</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="content"
                            value={this.state.text}
                            onChange={this.textChange} />
                    </FormGroup>
                </div>
                {alert}
                <button type="submit" className="btn btn-success">
                    SAVE
                </button>
            </form>
        );
    }
}

const NoteDetail = connect(mapStateToProps, mapDispatchToProps)(ConnectedNote);

export default NoteDetail;