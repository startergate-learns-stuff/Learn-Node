exports.template = (page, query, query2) => {
    return `<font color="red">its ${page} page</font><br />사용자가 보낸 QueryString: ${query}<br />사용자가 보낸 QueryString2: ${query2}`;
};

exports.table = (query) => {
    let str = '';
    for (let i = 1; i <= query.id; i++)
        str += '<td>' + i + '</td>';

    return '<table><tr>' + str + '</tr></table>';
};