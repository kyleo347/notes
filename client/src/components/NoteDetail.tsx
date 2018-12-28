import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote, addNote, deleteNote } from "../actions/note-actions";
import { Note } from "../model/Note";
import { AppState } from "../model/AppState";
import { FormGroup, ControlLabel, FormControl, Alert, Button, Modal } from "react-bootstrap";

const mapStateToProps = (state: AppState) => {
    return {
        note: state.notes.selected,
        error: state.error
    }
};

function mapDispatchToProps(dispatch: Function) {
    return {
        editNote: (note: Note) => dispatch(editNote(note)),
        addNote: (note: Note) => dispatch(addNote(note)),
        deleteNote: (id: string) => dispatch(deleteNote(id))
    };
}


class ConnectedNote extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = { 
            note : {...props.note} ,
            show: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    onChange = (e : any) => {
        const note: any = {...this.state.note};
        note[e.target.name] = e.target.value;
        this.setState({note: note});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        if (!this.state.note._id || this.state.note._id === 'new') {
            this.props.addNote({
                title: this.state.note.title,
                text: this.state.note.text
            });
        } else {
            this.props.editNote(this.state.note);
        }
    }

    handleDelete(event: any) {
        this.setState({show: false});
        this.props.deleteNote(this.state.note._id);
    }

    handleShow(event: any) {
        this.setState({show: true});
    }

    handleClose(event: any) {
        this.setState({show: false});
    }

    render() {
        const alert = this.props.error ? <Alert bsStyle="danger"><p>{this.props.error}</p></Alert> : ''
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="formGroup">
                        <FormGroup controlId="title">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.note.title}
                                placeholder="Enter text"
                                name="title"
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="text">
                            <ControlLabel>Note</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="content"
                                name="text"
                                value={this.state.note.text}
                                onChange={this.onChange} />
                        </FormGroup>
                    </div>
                    {alert}
                    <button type="submit" className="btn btn-success">
                        SAVE
                </button>
                    <Button bsStyle="danger" hidden={(!this.state.note._id || this.state.note._id === 'new')} onClick={this.handleShow}>Delete</Button>
                </form>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>Confirm</Modal.Header>
                    <Modal.Body><p>Are you sure you want to delete this note?</p></Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleDelete} bsStyle="danger">Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

const NoteDetail = connect(mapStateToProps, mapDispatchToProps)(ConnectedNote);

export default NoteDetail;