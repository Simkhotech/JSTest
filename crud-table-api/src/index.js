const express = require('express');
const bodyParser = require('body-parser');
const DBconnection = require(`./mysql/DBconnection`);
const {config} = require('./config');

const app = express();
const router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Accept-Encoding", "gzip, deflate, br");
    res.header("Access-Control-Allow-Headers", "access-control-allow-origin,content-type");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use('/', router);

router.post('/', function (req, res) {
    try {
        DBconnection.insertRows(req.body);
        res.send("Done");

    } catch (e) {
        console.warn("NOPE!!! : " + e);
        res.sendStatus(400);
    }
});

app.get('/', function(req, res) {
    try {
        JSON.stringify(DBconnection.selectRows((result) => res.send(result)));
    } catch (e) {
        console.warn("NOPE!!! : " + e);
        res.sendStatus(400);
    }
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`));
