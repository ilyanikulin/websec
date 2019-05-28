const pg = require('pg');
const table = 'test1' // имя таблицы в бд
const address = '10.0.30.2';

// const bodyParser = require('body-parser');

const signin = (response, request) => {
  const req = request.req.body;
  const login = req.login // получаем логин от клинета из окна авторизации
  const password = req.password // получаем пароль от клинета из окна авторизации

  pool = new pg.Pool({
    connectionString: `postgres://${login}:${password}@${address}/test1`
  });
  pool.connect( (err, client, done) => {
    done();
    if (err) {
      return response.status(520).send('fail') // при неуспехи авторизации выкидываем ошибку
    }
    return response.json({ data: 'connect' }) // при успехи клиент сохраняет данный логин и пароль и в дальнейшем атворизовывается по ним
  });
}

const getData = (request, response) => {
    const user = request.body.user;  // получаем логин от клинета из окна авторизации
    const pass = request.body.pass; // // получаем пароль от клинета из окна авторизации
    const filterParams = request.body.params;
    let pool;
    if(user && pass){
      pool = new pg.Pool({
        connectionString: `postgres://${user}:${pass}@${address}/test1`
      });  
    }
  
    // подключение к бд
    console.info('after connection')
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
        done();
        if (err) {
          return { err: err }
        }
        return response.json({
  
          // если запрос успешен, то возвращаем ответом данные в виде объекта {data: объект}
          data: res.rows
        })
      })
    })
}

module.exports = {
    signin,
    getData
}