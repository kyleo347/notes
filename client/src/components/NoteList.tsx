import React, { Component } from "react";
import { connect } from "react-redux";
import { Note } from "../model/Note";
import { Nav, NavItem } from "react-bootstrap";
import { AppState } from "../model/AppState";
import { selectNote } from "../actions/actions";

const mapStateToProps = (state: AppState) => {
    return {
        notes: state.notes,
        selected: state.selected
    };
};


function mapDispatchToProps(dispatch: Function) {
    return {
        selectNote: (note: Note) => dispatch(selectNote(note))
    };
}

class ConnectedList extends Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.handleSelect("new");
    }

    handleSelect(key: any) {
        let note = new Note;
        for (let i = 0; i < this.props.notes.length; i++) {
            if (this.props.notes[i].id === key) {
                note = this.props.notes[i];
                break;
            }            
        }
        this.props.selectNote(note);
    }

    render() {
        return (
            <Nav bsStyle="pills" stacked activeKey={this.props.selected ? this.props.selected.id : 'new'}>
                {this.props.notes.map((note: Note) => (
                    <NavItem eventKey={note.id} key={note.id} onSelect={this.handleSelect}>
                        {note.title}
                    </NavItem>
                ))}
                <NavItem eventKey="new" key="new" onSelect={this.handleSelect}>
                    New note
                </NavItem>
            </Nav>

        )
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;