import React, {Component} from 'react';
import './Select.css'

export default class Select extends Component {
    constructor(){
        super(...arguments);

        this.state = {
            text: ''
        }
    }
   
    select = (ev)=>{
        this.state.text=ev.target.value;
        this.props.holderChange(this.props.field, ev.target.value);
    }

    render() {
        let opts = this.props.data.map((item)=><option key={'option.'+item} value={item}>{item}</option>)
        return (

            <div className={"filter-"+this.props.field+" filter-item"}> 
                <label htmlFor={this.props.field} className="label-select">{this.props.filterName}</label><br/>
                <div className="filter-select">
                <select ref={this.props.field} onChange={this.select} className="filter" placeholder="">
                    <option value=""></option>
                    {opts}
                </select>
                </div>
                
            </div>
        );
    }
}