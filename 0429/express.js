const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log('middleware 1')
    next()
});

app.use((req, res, next) => {
    console.log('middleware 2')
    next()
});

app.get('/', (req, res) => {
    res.send('hello');
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
    if (req.body.id === 'smart' && req.body.pw === '123') req.redirect('/Users/choi/CodingData/Learn-Node/0429/login_s.html')
    else req.redirect('/Users/choi/CodingData/Learn-Node/0429/login_f.html')
});

app.listen(3000, _ => {

});