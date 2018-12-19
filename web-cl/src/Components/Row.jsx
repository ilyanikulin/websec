import React, {Component} from 'react';

export default class Row extends Component {
    render(){
        let data = this.props.data;
        return (
            <tr className="row">
                <td className="field field-id">{data.ID}</td>
                <td className="field field-two">
                    <div className="name-danger">{data.m_name}</div>
                    <div className="os-danger">{data.soft_vendor}. {data.soft_name}</div>
                </td>
                <td className="field field-three">{  (data.m_data && data.m_data!==null )? data.m_data.slice(0,-14):''  }</td>
                <td className="field field-four"><div className="remove-button"></div></td>
            </tr>
        );
    }
}