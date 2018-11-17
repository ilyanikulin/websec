const Router = require('express-promise-router');
const db = require('./db');
const router = new Router();

router.post('/',  (req, res) => {
  db.connect("postgres://test1:133@10.0.0.100/test1");


});


module.exports = router;