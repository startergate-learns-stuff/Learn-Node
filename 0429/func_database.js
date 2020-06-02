const conn = require('./config_database');

exports.login = async (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    let sql = "SELECT * FROM member WHERE id=? AND pw=?";

    try {
        const rows = await (await conn).query(sql, [id, pw]);
        if (rows[0]) res.redirect('http://localhost:63342/Learn-Node/0429/login_s.html')
        else res.redirect('http://localhost:63342/Learn-Node/0429/login_f.html')
        console.log('success')
    } catch (e) {
        console.log(e);
        res.send("no u");
    }
};

exports.join = async (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const nickname = req.body.nickname;

    let sql = "INSERT INTO member VALUES (?, ?, ?)";

    try {
        const rows = await (await conn).query(sql, [id, pw, nickname]);
        console.log('success');
    } catch (e) {
        console.log('u r fucked');
    }
    res.send((await conn).serverVersion());
};

exports.delete = async (req, res) => {
    const id = req.body.id;

    let sql = "DELETE FROM member WHERE id=?";

    try {
        const rows = await (await conn).query(sql, [id]);
        res.send('success');
    } catch (e) {
        res.send('u r fucked');
    }
};

exports.update = async (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    let sql = "UPDATE member SET pw=? WHERE id=?";

    try {
        const rows = await (await conn).query(sql, [pw, id]);
        res.send('success');
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
    const id = req.body.id;

    let sql = "SELECT * FROM member";

    try {
        const rows = await (await conn).query(sql);
        res.write('<html>');
        res.write('<body>');
        res.write('<table>');
        for (let row of rows) {
            res.write('<tr>');
            res.write('<td>' + row.id + '</td>');
            res.write('<td>' + row.nickname + '</td>');
            res.write('<tr>');
        }
        res.write('</table>');
        res.write('</body>');
        res.write('</html>');
        // res.send(rows)
        res.end();
    } catch (e) {
        console.log(e + 'sfd')
        res.send('u r fucked');
    }
};