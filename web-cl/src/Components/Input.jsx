import React, {Component} from 'react';
import './Input.css'

export default class Input extends Component {
    constructor(){
        super(...arguments);

        this.state = {
            showDialog: false,
            text: ''
        }
    }
    holderChange = (ev) => {
       this.state.text = ev.target.value ;
        this.props.holderChange(this.props.field, this.state.text);
        if(this.state.text!=='' && this.state.text!==null){
            this.setState({showDialog: true});
        }
    }
    select = (data)=>{
        this.setState({showDialog: false});
        this.state.text=data;
        this.props.holderChange(this.props.field, data);
    }

    render() {
        let dialog;
        let list=[];
        if(this.props.data){
            this.props.data.filter((data) => {
                let rg = new RegExp(this.state.text,"ig");
                if(data.search(rg)!=-1){
                    list.push(
                    <div key={'key.'+data} className="choose-it" onClick={()=>{
                        this.refs.input.value = data;
                        this.select(data);
                    }}>{data}</div>
                )}
            });
            if(this.state.showDialog && this.state.text!='') {
                dialog=<div className="dialog" >{list}</div>
            }
        }
        

        return (
            <div className="filter-input filter-item">
                <div  className="label-type">{this.props.filterName}</div> 
                <div className="input-field"><input ref="input" className="input filter" placeholder={this.props.placeholder} onChange={this.holderChange}/>
                <div className="button-dialog" onClick={
                    ()=>{this.refs.input.value = '';
                    this.select();
                    }
                }/></div>
                {dialog}
            </div> 
        );
    }
}