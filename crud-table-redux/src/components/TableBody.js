import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'react-bootstrap-table/css/react-bootstrap-table.css';

import TableRow from './TableRow';

class TableBody extends Component {
    render() {

        let items = this.props.rows;

        return (
            <tbody>
            {items.map((row, index) =>
                <TableRow key={row.id} index={index} row={row}/>
            )}
            </tbody>
        );
    }
}

export default connect(
    state => ({
        rows: state.rows
    }),
    dispatch => ({})
)(TableBody);
