import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Button, ButtonGroup} from "react-bootstrap";

import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {toDownloadJSON} from '../actions/toDownloadJSON';
import {getRowsFromDB, saveRowsToDB} from '../actions/workWithDB';
import config from '../config';

import TableHeads from './TableHeads';
import TableBody from './TableBody';

class App extends Component {
    render() {
        return (
            <div style={{margin: '5px'}}>
                <Button bsStyle="info"
                        onClick={this.props.onAddRow}>Add row</Button>
                <ButtonGroup style={{margin: '0 5px'}}>
                    <Button bsStyle="warning"
                            onClick={this.props.onGetFromDB}>Get from DB</Button>
                    <Button bsStyle="danger"
                            onClick={() => this.props.saveToDB(this.props.rows)}>Save to DB</Button>
                </ButtonGroup>
                <Button bsStyle="danger"
                        onClick={() => toDownloadJSON(this.props.rows, this.refs.downloadAnchor)}>Download JSON</Button>
                <Table responsive hover>
                    <TableHeads/>
                    <TableBody/>
                </Table>
                <span ref='downloadAnchor' style={{display: 'none'}}>Get JSON</span>
            </div>
        );
    }
}

export default connect(
    state => ({
        rows: state.rows
    }),
    dispatch => ({
        onAddRow: () => {
            dispatch({type: config.reducerActions.addRow});
        },
        onGetFromDB: () => {
            dispatch(getRowsFromDB());
        },
        saveToDB: (rows) => {
            dispatch(saveRowsToDB(rows));
        }
    })
)(App);
