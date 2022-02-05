importClass(org.jsoup.Jsoup);
const { clientKey, masterKey } = require("config");
const spgRequest = {
    requestFunc: (funcName, params) => {
        let result = Jsoup.connect("서버 주소")
        .header("client-key", clientKey)
        .data("function", funcName)
        .data("data", JSON.stringify(params))
        .ignoreContentType(true)
        .post();
        return JSON.parse(result.text());
    },
    requestQuery: (sqlQuery) => {
        let result = Jsoup.connect("서버 주소2")
        .header("master-key", masterKey)
        .data("query", sqlQuery)
        .ignoreContentType(true)
        .post();
        return JSON.parse(result.text());
    }
}
module.exports = spgRequest;
