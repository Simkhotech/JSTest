import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from 'react-bootstrap';

import 'react-bootstrap-table/css/react-bootstrap-table.css';
import config from '../config';

class TableRow extends Component {

    row = this.props.row;
    columns = Object.keys(this.row);
    disabled = true;

    editRow() {
        this.disabled = !this.disabled;

        this.columns.map(key => {
            if (key !== 'id')
                this[`${key}_field`].disabled = '';
        });

        this.props.onEditRow();
    }

    saveRow() {
        this.disabled = !this.disabled;

        this.columns.map(key => {
            this[`${key}_field`].disabled = 'disabled';
            this.row[key] = this[`${key}_field`].value;
        });

        this.props.onSaveRow();
    }

    render() {
        return (
            <tr>
                {this.columns.map(key =>
                    <td key={`td_${this.row.id}_${key}`}>
                        <input className={'form-control'}
                               disabled={this.disabled}
                               type={'text'}
                               ref={(ref) => this[`${key}_field`] = ref}
                               defaultValue={this.row[key]}/>
                    </td>
                )}
                <td>
                    <ButtonGroup style={{}}>
                        {this.disabled
                            ? <input type={'button'}
                                     className={'btn btn-primary'}
                                     onClick={this.editRow.bind(this)}
                                     value={'Edit'}
                            />
                            : null}
                        {this.disabled
                            ? null
                            : <input type={'button'}
                                     className={'btn btn-success'}
                                     onClick={this.saveRow.bind(this)}
                                     value={'Save'}
                            />}
                        <Button bsStyle="danger"
                                onClick={() => this.props.onDeleteRow(this.props.index)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }
}

export default connect(
    state => ({
        rows: state.rows
    }),
    dispatch => ({
        onDeleteRow: (index) => {
            dispatch({type: config.reducerActions.deleteRow, payload: index});
        },
        onEditRow: () => {
            dispatch({type: config.reducerActions.editRow})
        },
        onSaveRow: () => {
            dispatch({type: config.reducerActions.saveRow})
        }
    })
)(TableRow);
