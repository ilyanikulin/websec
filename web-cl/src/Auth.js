import React, {Component} from 'react';
import './Auth.css';

export default class Auth extends Component {
    auth = () => {
        this.props.auth(this.refs.inputUser.value, this.refs.inputPass.value);
    }
    render(){
        return (
        <div className="auth-container">
               <span className="auth-title">ВОЙТИ</span>
                <div className='field'>
                    <input ref='inputUser' placeholder="Логин" />
                </div>
                <div className='field'>
                    <input ref='inputPass' placeholder="Пароль"/>
                </div>
                <div className="auth-accept" onClick={this.auth}>Вход</div>
        </div>);
    }
}