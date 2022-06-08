const express = require('express');
const path = require('path');
const app = express();
const route = require('./src/routes');
const bodyParser = require('body-parser')
const PORT = 8000;
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json());
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(route);
app.listen(PORT, () => {
    console.log(`Application Running At http://localhost:${PORT}`);
});