//подключаем модули:
import React, { Component } from 'react' // реакт
import './App.css' //стили 
import AppContainer from './AppContainer' ;
import Auth from './Auth' //компонент аутентификации

class App extends Component {
  constructor () { 
    super(...arguments)
    this.state = {  //состояния, в котором храняться данные
      data: [],
      auth: false,
      user: null,
      pass: null
    }
  } 
  // функция, которая будет выполняться перед отрисовкой компонента
  componentWillMount () { 
    if(this.state.auth){
      this.getData(); //функция получение данных и записи их в состояние
    }   
  }

  //функция для аутентификации (TODO)
  login = async (user, pass) => { 
    await fetch(`http://localhost:4000/signin`, {
      method: 'POST',
      body: JSON.stringify({ login: user, password: pass }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(response => this.setState({auth:true, user: user, pass: pass}))
      .then(()=>this.getData())
      .catch(err=>this.setState({auth:false, user:null, pass: null}));
  }

  logout = () => {
    this.setState({
      auth: false,
      user: null,
      pass:null
    });
  }
  //функция для получения данных
  getData = ( filterParams) => {
    //отправляем запрос на web-server
    fetch(`http://localhost:4000/`, {
      method: 'POST', //методом post
      //даные в теле запроса:
      body: JSON.stringify( 
        { params: filterParams, user: this.state.user, pass: this.state.pass }
      ),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(response => response.json()) // при успехе обрабатываем данные полученные
      .then(response => this.setState({ data: response.data })) //и записываем их в состояние
      .catch(err => console.error(err)) //при ошибке выводим в консоль ее 
  }

  //функция отрисовки компонента приложения
  render () {
    
    let auth = <Auth auth={this.login} />
    let content = (
      <AppContainer data={this.state.data} filter={this.getData} login={this.state.user} logout={this.logout}/>
        
      )
    
    return (
      <div className='App'>
        {this.state.auth ? content : auth}
      </div>
    )
  }
}

export default App
