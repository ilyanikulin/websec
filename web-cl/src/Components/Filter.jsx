import React,{Component} from 'react';
import './Filter.css';
import Input from './Input';
import Select from './Select';

export default class Filter extends Component{

    constructor(){
        super(...arguments);
        this.state={
        };
    }     

    holderChange = (key,value)=>{
        this.setState({[key]: value});
    }
    getUnique(arr) {
        var unique =[];
        if(arr){
           for(let j in arr){
               if(arr[j].indexOf(',')!=-1 && arr[j]){        
                   arr = arr.concat(arr[j].split(', '));
               }
            }
           var current,
           length = arr.length;
           
           for (let i=0; i < length; i++) {
             current = arr[i];          
             if (unique.indexOf(current)==-1) {            
               unique.push(current);
             }
           }
           
        }
        return unique;       
   }

    filter=()=>{
        let confirmFilter={};  
        let evalCode = '';
        for(let key in this.state){
            if(this.state[key]==null  || this.state[key]=='' || !this.state[key]) continue;
            else {confirmFilter[key]=this.state[key]; evalCode+=this.state[key]; }
        }    
        try{
            eval(evalCode);
        } catch (err){
            
        }     
        this.props.filter(confirmFilter);
    }
    clearFilter=()=> { 
        for (let i=0; i<document.getElementsByTagName('input').length; i++){
            document.getElementsByTagName('input')[i].value = '';
        }
        for (let i=0; i<document.getElementsByTagName('select').length; i++){
            document.getElementsByTagName('select')[i].options[0].selected = true;
        }
        const blankState = {};
        Object.keys(this.state).forEach(stateKey => {
            blankState[stateKey] = undefined;
          });
        this.setState(blankState);
        this.props.filter({});
    }

    render(){ 
        // this.getParam('status');
        return (
        <div className="filter-container" >
            <div className="filter-title">ФИЛЬТРАЦИЯ</div><br/>

            <Input key="search" field="search" holderChange={this.holderChange}  filterName="Контекстный поиск по названию уязвимости" placeholder="Введите слово или словосочетание"/>
           
            <Input key="soft_vendor" data={this.getUnique(this.props.data.map((data)=>data.soft_vendor))} field="soft_vendor" holderChange={this.holderChange} filterName="Произовдитель ПО" placeholder="Выберите производителя ПО"/>
           
            <Select key="soft_type" data={this.getUnique(this.props.data.map((data)=>data.soft_type))} field="soft_type" holderChange={this.holderChange} filterName="Тип ПО" placeHolder="Выберите тип ПО"/>
            
            <Input key="soft_name" data={this.getUnique(this.props.data.map((data)=>data.soft_name))} field="soft_name" holderChange={this.holderChange} filterName="Программное обеспечение" placeholder='Выберите программное обеспечение'/>
            
            <Input key="soft_v" data={this.getUnique(this.props.data.map((data)=>data.soft_v))} field="soft_v" holderChange={this.holderChange} filterName="Версия ПО" placeholder='Версия ПО'/>
            
            <Select key="status" data={["Подтверждена производителем","Потенциальная уязвимость","Подтверждена в ходе исследований"]} field="status" holderChange={this.holderChange} filterName="Статус уязвимости" placeHolder="Выберите статус уязвимости"/>
            
            <br/><br/>
            <div className="button-filter">
                <div className="button-confirm button" onClick={this.filter}>Применить</div>      
                
                <div className="button-cancel button" onClick={this.clearFilter}>Сброс</div>                      
            </div>
            
        </div>)
    }
}