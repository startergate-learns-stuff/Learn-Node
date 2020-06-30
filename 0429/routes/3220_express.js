const express = require('express');
const bodyParser = require('body-parser');
const sessionP = require('express-session');

const func = require('../conf/func_database');

const app = express();

app.set('views', '../views');

app.use(express.static('../public'))

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(sessionP({
    secret: 'nodeisnode',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    console.log('middleware 1');
    next();
});

app.use((req, res, next) => {
    console.log('middleware 2');
    next();
});

app.get('/', (req, res) => {
    req.session.user = {
        name: "jason",
        age: 20
    };
    console.log("session saved");

    res.render('review', {
        num: 5
    });
});

app.get('/page', (req, res) => {
    res.send(`date ${req.query.targetDt}<br>page ${req.query.pageNo}`);
});

app.get('/admin/:id/:dt', (req, res) => {
    res.send(req.params.dt + '<br>' + req.params.id);
});

app.get('/numberSum', (req, res) => {
    let start = req.query.start * 1;
    let end = req.query.end * 1;
    let sum = (start + end) * (end - start + 1) / 2
    res.send(`
        <h1>${req.query.start}~${req.query.end}의 합</h1>
        결과: ${sum}
    `)
});

app.get('/siteMove', (req, res) => {
    let path;
    switch (req.query.redirectTo) {
        case 'google':
            path = 'https://www.google.com';
            break;
        case 'naver':
            path = 'https://www.naver.com';
            break;
        case 'daum':
            path = 'https://www.daum.net';
            break;
        default:
            path = 'https://gsm.gen.hs.kr';
    }
    res.redirect(path);
});

app.post('/loginCheck', (req, res) => {
    if (req.body.id === 'smart' && req.body.pw === '123') res.redirect('./login_s.ejs');
    else res.redirect('login_f.ejs');
});

app.post('/login', func.login);

app.post('/join', func.join);

app.get('/delete', func.delete);

app.post('/update', func.update);

app.post('/one-select', func.select);

app.get('/mail', (req, res) => {
    res.render('mail');
});

app.all('/all-select', (req, res) => {
    console.log("username: " + req.session.user.name);
    func.selectAll(req, res)
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.render('login', {user: req.session.user});
    } else {
        res.render('login', {user: null});
    }
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/message');
})

app.get('/message', (req, res) => {
    if (req.session.user) {
        res.render('message', {user: req.session.user});
    } else {
        res.render('message', {user: null});
    }
});

app.listen(3000, _ => {
    console.log("SERVER ON")
});