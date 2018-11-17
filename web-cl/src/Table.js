import React, { Component } from 'react';
import Row from './Row';
import './Table.css';

export default class Table extends Component {

    render() {
        let table = this.props.data.map((item,index)=><Row key={'row'+index.toString()} data={item} />);
        return (
            <div className="table-container">
                    <table >
                        <tbody>
                            {table}
                        </tbody>
                    </table>
            </div>
        );
    }
}