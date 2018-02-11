const express = require('express');
const bodyParser = require('body-parser');
const DBconnection = require(`./mysql/DBconnection`);

const app = express();
const router = express.Router();

app.use(function(req, res, next) {
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

router.post('/', function(req, res) {
    console.log(req);

    let arrayOfObjects = req.body;

    console.log(arrayOfObjects);

    try {
        DBconnection.insertRows(arrayOfObjects);
        res.send("Done");

    } catch (e){
        console.warn("NOPE!!! : " + e);
        res.sendStatus(400);
    }
});

app.listen(3001, () => console.log('App listening on port 3001!'));