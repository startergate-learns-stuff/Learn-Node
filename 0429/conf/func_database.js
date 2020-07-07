const conn = require('./config_database');

exports.login = async (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;

    let sql = "SELECT * FROM WEB_MEMBER WHERE email=? AND pw=?";

    try {
        const rows = await (await conn).query(sql, [email, pw]);
        if (rows[0]) {
            req.session.user = {
                email: email,
                pw: pw,
                tel: rows[0].tel,
                address: rows[0].address
            };
            res.redirect('/message');
        }
        else res.render('login_f');
        console.log('success');
    } catch (e) {
        console.log(e);
        res.send("no u");
    }
};

exports.join = async (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;
    const tel = req.body.tel;
    const address = req.body.addr;

    console.log('email: ' + email);
    console.log('pw: ' + pw);
    console.log('tel: ' + tel);
    console.log('address: ' + address);

    let sql = "INSERT INTO WEB_MEMBER VALUES (?, ?, ?, ?)";

    try {
        const rows = await (await conn).query(sql, [email, pw, tel, address]);
        console.log('success');
    } catch (e) {
        console.log(e)
        console.log('u r fucked');
    }
    res.redirect('/message')
};

exports.delete = async (req, res) => {
    const id = req.query.id;

    let sql = "DELETE FROM member WHERE id=?";

    try {
        const rows = await (await conn).query(sql, [id]);
        res.redirect('/all-select');
    } catch (e) {
        res.send('u r fucked');
    }
};

exports.update = async (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;
    const tel = req.body.tel;
    const address = req.body.address;

    let sql = "UPDATE WEB_MEMBER SET pw=?, tel=?, address=? WHERE email=?";

    try {
        const rows = await (await conn).query(sql, [pw, tel, address, email]);
        req.session.user = {
            email: email,
            pw: pw,
            tel: tel,
            address: address
        };
        res.redirect('/message');
    } catch (e) {
        res.send('u r fucked');
    }
};

exports.select = async (req, res) => {
    const id = req.body.id;

    let sql = "SELECT * FROM member WHERE id=?";

    try {
        const rows = await (await conn).query(sql, [id]);
        for (let row of rows)
            console.log('검색된 데이터: ', row.nickname);
        res.send(rows)
    } catch (e) {
        res.send('u r fucked');
    }
};

exports.selectAll = async (req, res) => {
    let sql = "SELECT * FROM member";

    try {
        const rows = await (await conn).query(sql);
        res.render('select-all', {rows: rows, user: req.session.user});
    } catch (e) {
        res.send('u r fucked');
    }
};