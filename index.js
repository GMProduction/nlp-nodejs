const express = require('express');
const path = require('path');
const app = express();
const route = require('./src/routes');
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const fileUpload = require('express-fileupload');
var flash = require('express-flash');
const PORT = 8002;
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    },
    resave: false
}));
app.use(fileUpload({
    createParentPath: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(flash());
app.use(express.json());
app.use(express.static('public'))

app.use(function (req, res, next) {
    let session = req.session;
    res.locals.user = session.user;
    next()
})
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(route);
app.listen(PORT, () => {
    console.log(`Application Running At http://192.168.28.136:${PORT}`);
});
// app.listen(PORT, "192.168.137.1");