//подключаем модули:
import React, { Component } from 'react' // реакт
import './App.css' //стили 
import Table from './Table' //компонент таблицы
import Filter from './Filter' //компонент панели фильтрации
import Auth from './Auth' //компонент аутентификации

class App extends Component {
  constructor () { 
    super(...arguments)
    this.state = {  //состояния, в котором храняться данные
      data: [],
      token: null
    }
  } 
  // функция, которая будет выполняться перед отрисовкой компонента
  componentWillMount () { 
    // this.login('test1','133');
    this.getData() //функция получение данных и записи их в состояние
    // if(this.state.token && this.state.token !==null){
    //   this.getData();
    // }
  }

  //функция для аутентификации (TODO)
  login = (user, pass) => { 
    fetch(`http://localhost:4000/signin`, {
      method: 'POST',
      body: JSON.stringify({ login: user, password: pass }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(response => this.setState({ token: response }))
    this.getData()
  }
  //функция для получения данных
  getData = filterParams => {
    //отправляем запрос на web-server
    fetch(`http://localhost:4000/`, {
      method: 'POST', //методом post
      //даные в теле запроса
      //Либо запрос отправляется пустой без параметров, либо с ними
      body: JSON.stringify( 
        { params: filterParams, token: this.state.token } || {
          token: this.state.token
        }
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
    let table;
    (this.state.data!==undefined && this.state.data.length!==0 )? table=<Table  data={this.state.data}/> : {}
    let auth = <Auth auth={this.login} />
    let content = (
      <div className='data-container'>
        <Filter data={this.state.data} filter={this.getData} />
        {table}
      </div>
    )
    return (
      <div className='App'>
        {content}
        {/* {this.state.token !== null? content : auth} */}
      </div>
    )
  }
}

export default App
