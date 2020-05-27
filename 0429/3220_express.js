const express = require('express');
const bodyParser = require('body-parser');

const mariadb = require('mariadb');

const app = express();

const db_password = 'somethingelse';

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

app.post('/loginCheck', async (req, res) => {
    if (req.body.id === 'smart' && req.body.pw === '123') res.redirect('./login_s.html');
    else res.redirect('login_f.html');
});

app.post('/login', async (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: db_password,
        database: 'software'
    });

    let sql = "SELECT * FROM member WHERE id=? AND pw=?";

    try {
        const rows = await conn.query(sql, [id, pw]);
        if (rows) res.redirect('http://localhost:63342/Learn-Node/0429/login_s.html')
        else res.redirect('http://localhost:63342/Learn-Node/0429/login_f.html')
        console.log('success')
    } catch (e) {
        console.log(e);
        res.send("no u");
    }
})

app.post('/join', async (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const nickname = req.body.nickname;

    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: db_password,
        database: 'software'
    });

    let sql = "INSERT INTO member VALUES (?, ?, ?)";

    try {
        const rows = await conn.query(sql, [id, pw, nickname]);
        console.log('success');
    } catch (e) {
        console.log('u r fucked');
    }
    res.send(conn.serverVersion());
});

app.post('/delete', async (req, res) => {
    const id = req.body.id;

    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: db_password,
        database: 'software'
    });

    let sql = "DELETE FROM member WHERE id=?";

    try {
        const rows = await conn.query(sql, [id]);
        res.send('success');
    } catch (e) {
        res.send('u r fucked');
    }
})

app.post('/update', async (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: db_password,
        database: 'software'
    });

    let sql = "UPDATE member SET pw=? WHERE id=?";

    try {
        const rows = await conn.query(sql, [pw, id]);
        res.send('success');
    } catch (e) {
        res.send('u r fucked');
    }
});

app.post('/one-select', async (req, res) => {
    const id = req.body.id;

    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: db_password,
        database: 'software'
    });

    let sql = "SELECT * FROM member WHERE id=?";

    try {
        const rows = await conn.query(sql, [id]);
        for (let row of rows)
            console.log('검색된 데이터: ', row.nickname);
        res.send(rows)
    } catch (e) {
        res.send('u r fucked');
    }
});

app.listen(3000, _ => {

});