const express = require('express')
const pg = require('pg')
const cors = require('cors')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express() // для поднятия веб-сервиса
app.use(cors())
app.use(bodyParser.json()) // парсинг данных адекватный
app.listen(4000) // запускаем наш веб сервис на 4000 порту

const table = 'test1' // имя таблицы в бд
var pool = new pg.Pool({
  connectionString: `postgres://test1:133@10.0.0.100/test1`
}) // объект для подключения к бд
// var pool = null;
var token

// Маршруты:

// Авторизация
app.post('/signin', async function (request, response) {
  const login = request.body.login
  const password = request.body.password

  pool = new pg.Pool({
    connectionString: `postgres://${login}:${password}@10.0.0.100/test1`
  })
  await pool.connect().then(() => {
    token = jwt.sign({ login: login, password: password }, 'secret-string')
    // pool.end();
  })
  console.log(token)
  return response.json({ data: token })
})

// Получение данных
app.post('/', function (request, response) {
  const filterParams = request.body.params
  // const tokenClient = request.body.token;  // токен в будущем для аутентификации

  // подключение к бд
  pool.connect(async function (err, client, done) {
    if (err) {
      // если ошибка возвращаем
      return console.error(err.message)
    }
    // устанавливаем параметры для фильтрации.
    // первоначальные параметры:
    let queryString = `SELECT * FROM ${table}`
    // Если есть параметры для фильтрации, то мы их добавляем к строке запроса:
    if (filterParams && Object.keys(filterParams).length !== 0) {
      queryString +=
        ' WHERE ' +
        (await client
          .query(
            `SELECT column_name FROM information_schema.columns WHERE table_name='${table}'`
          )
          .then(res =>
            res.rows.filter(item => {
              if (item.column_name != 'm_data') {
                return item
              }
            })
          )
          .then(res => {
            let text = ''
            for (var key in filterParams) {
              // перебираем все параметры фильтрации
              if (key == 'search') {
                // поиск по всем полям
                text += ' ('
                for (let col in res) {
                  text += `"${res[col].column_name}" ILIKE '%${filterParams[key]}%' OR `
                }
                text = text.slice(0, -3)
                text += ') AND '
              } else {
                text += `"${key}" ILIKE '%${filterParams[key]}%' AND `
              }
            }
            text = text.slice(0, -4)
            return text
          }))
    }
    // в итоге получем конечную строку запроса, вставляем ее в запрос и ограничиваем, ибо это тестовые проект
    client.query(`${queryString} LIMIT 20`, (err, res) => {
      done() // завершаем коннект
      if (err) {
        return { err: err }
      }
      return response.json({
        // если запрос успешен, то возвращаем ответом данные в виде объекта {data: объект}
        data: res.rows
      })
    })
  })
})
