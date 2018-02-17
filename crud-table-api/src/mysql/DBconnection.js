const mysql = require('mysql');
const express = require('express');
const {config} = require('../config');

const connection = mysql.createConnection({
    host: config.dbConnection.host,
    user: config.dbConnection.user,
    password: config.dbConnection.password,
    database: config.dbConnection.database,
});


function createTable() {

    connection.query(`DROP TABLE IF EXISTS crud_table`, function (err, rows, fields) {
        if (err) throw err;
    });

    connection.query(
        `CREATE TABLE crud_table (
            id varchar(255),
            age varchar(255),
            name varchar(255),
            gender varchar(255),
            company varchar(255),
            email varchar(255),
            phone varchar(255),
            address varchar(255)
        );`, function (err, rows, fields) {
            if (err) throw err;
        });

}

connection.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports.insertRows = function insertRows(arrayOfObjects) {


    createTable();

    arrayOfObjects.forEach(obj => {
        let query = `INSERT INTO crud_table (id, age, name, gender, company, email, phone, address) VALUES ('` + obj.id + `', '` +
            obj.age + `', '` + obj.name + `', '` + obj.gender + `', '` + obj.company + `', '` + obj.email + `', '` + obj.phone + `', '` +
            obj.address + `')`;

        console.log(query);

        connection.query(
            query, obj, function (err, rows, fields) {
                if (err) throw err;
            });
    });

};

module.exports.selectRows = (callback) =>{

    let result = [];

    connection.query(`SELECT * FROM crud_table`, function (err, res, fields) {
        if (err) throw err;
        result = JSON.stringify(res);

        console.log(result);
        return callback(result);
    });
};
