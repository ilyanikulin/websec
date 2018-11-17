import React, {Component} from 'react';
import './FilterVendor.css'

export default class FilterVendor extends Component {
    constructor(){
        super(...arguments);

        this.state = {
            showDialog: false,
            soft_vendor: ''
        }
    }
    holderChange = (ev) => {
        this.setState({soft_vendor:ev.target.value});
        this.props.holderChange(this.state.soft_vendor);
        if(this.state.soft_vendor!='' && this.state.soft_vendor!==null){
            this.setState({showDialog: true});
        }
        
    }
    selectVendor = ()=>{
        let vendor = this.refs.vendor.value;
        this.setState({showDialog: false});
        this.props.holderChange(vendor);
    }

    render() {
        let dialog;
        let list=[];
        this.props.vendors.filter((vendor) => {
            let rg = new RegExp(this.state.soft_vendor,"ig");
            if(vendor.search(rg)!=-1){
                list.push(
                <div className="choose-vendor" onClick={()=>{
                    this.refs.vendor.value = vendor;
                    this.selectVendor();
                }}>{vendor}</div>
            )}
        });
        if(this.state.showDialog && this.state.soft_vendor!='') {
            dialog=<div className="vendor-dialog">{list}</div>
        }
        return (
            <div className="filter-vendor">
                <label htmlFor="vendor" className="label-select">Производитель ПО</label><br/>  
                <input ref="vendor" className="input-vendor" placeholder="Введите производителя ПО" onChange={this.holderChange}/>
                {dialog}
            </div> 

        );
    }
}