import React,{Component} from 'react';
import Table from './Table';
import Filter from './Filter'
import './AppContainer.css'

export default class AppContainer extends Component{


    render(){ 
        let table;
        (this.props.data && this.props.data.length!==0 )? table=<Table  data={this.props.data}/> : {}
        return (
            <div className='app-Container'>
                <div className='data-container'>
                    <Filter data={this.props.data} filter={this.props.filter} />
                    {table}
                </div>
                <div className="logField">
                    <div>Hello, <span className="user-field">{this.props.login}</span> </div> 
                    <div><a className="button-logout" onClick={this.props.logout}>logout</a></div>
                </div>
          </div>
       )
    }
}