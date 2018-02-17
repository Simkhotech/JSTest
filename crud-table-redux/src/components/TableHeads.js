import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'react-bootstrap-table/css/react-bootstrap-table.css';
import config from '../config';

class TableHeads extends Component {

    sort = (head) => {
        if (head !== 'actions') {
            this.props.onSort(head);
        }
    };

    render() {
        let columns = this.props.columns;
        columns.push('actions');

        return (
            <thead>
            <tr>
                {columns.map((header, index) =>
                    <th key={`${header}_${index}`}
                        style={{textTransform: 'capitalize'}}
                        onClick={(e) => this.sort(e.target.innerHTML)}>
                        {header}
                    </th>
                )}
            </tr>
            </thead>
        );
    }
}

export default connect(
    state => ({
        columns: Object.keys(state.rows[0])
    }),
    dispatch => ({
        onSort: (header) => {
            dispatch({type: config.reducerActions.sortRows, payload: header});
        }
    })
)(TableHeads);
