const express = require('express');
const app = express();
const mustache = require('mustache-express');

const router = require('./routes/courseworkRoutes');

app.use('/', router);
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.listen(3000, () => {
 console.log('Server started on port 3000. Ctrl^c to quit.');
})

