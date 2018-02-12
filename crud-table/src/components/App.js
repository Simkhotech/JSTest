import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, ButtonGroup} from "react-bootstrap";

import 'react-bootstrap-table/css/react-bootstrap-table.css';

import toDownloadJSON from '../actions/toDownloadJSON'
import config from '../config'

class CustomInsert extends React.Component {

    handleSaveBtnClick = () => {
        const {columns, onSave} = this.props;
        const newRow = {};

        columns.forEach((column, i) => newRow[column.field] = column.field === 'id' ? (new Date()).getTime() : '', this);

        onSave(newRow);
    };

    render() {
        const {columns, onSave} = this.props;

        this.handleSaveBtnClick(columns, onSave);

        return (<div>=)</div>);
    }
}

export default class App extends Component {

    downloadJSON = () => {
        toDownloadJSON(this.refs.bTable.state.data, this.refs.downloadAnchor);
    };

    saveInDB = () => {
        let first = true;
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open("POST", config.dbServer, true);

        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");

        xmlHttp.onreadystatechange = () => {
            if (first && xmlHttp.readyState === XMLHttpRequest.DONE) {
                alert(
                    (xmlHttp.status === 200) ?
                        `Saved!` : `Not Saved! (${xmlHttp.status})`
                );
                first = false;
            }

        }

        xmlHttp.send(JSON.stringify(this.refs.bTable.state.data));
    };

    render() {

        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
        };

        const selectRowProp = {
            mode: 'checkbox',
        };

        const createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
            const attr = {
                onModalClose, onSave, columns, validateState, ignoreEditable
            };

            return (
                <CustomInsert {...attr} />
            );
        };

        const options = {
            insertModal: createCustomModal,
            insertText: 'New Row',
        };

        return (
            <div>
                <BootstrapTable
                    data={this.props.items}
                    cellEdit={cellEditProp}
                    selectRow={selectRowProp}
                    deleteRow
                    insertRow

                    ref='bTable'

                    options={options}
                >
                    <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='age'>Age</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='gender'>Gender</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='company'>Company</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='phone'>Phone</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='address'>Address</TableHeaderColumn>
                </BootstrapTable>
                <br/>
                <ButtonGroup>
                    <Button bsStyle="primary" onClick={this.downloadJSON}>Download JSON</Button>
                    <Button bsStyle="success" onClick={this.saveInDB}>Save in DB</Button>
                </ButtonGroup>
                <span ref='downloadAnchor' style={{display: 'none'}}>Get JSON</span>
            </div>
        );
    }
}
