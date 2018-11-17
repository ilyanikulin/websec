const express = require('express');
const mountRoutes = require('./routes');
const app = express();
app.use(mountRoutes);

app.listen(4000);