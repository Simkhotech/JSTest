const mysql = require('mysql');
const express = require('express');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbuser',
    database: 'crud_db'
});

function createTable() {

    connection.query(`DROP TABLE IF EXISTS crud_table`, function (err, rows, fields) {
        if (err) throw err;

        console.log(`Dropped table crud_table (if need)`)
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

            console.log(`Created new table crud_table (if need)`)
        });

};

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
            query, obj,  function (err, rows, fields) {
            if (err) throw err;

            console.log(`Dropped table crud_table (if need)`)
        });
    });

    // connection.destroy();
    // console.log("Connection closed!");
};