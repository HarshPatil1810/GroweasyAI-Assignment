const fs = require("fs");
const csv = require("csv-parser");

exports.parseCSV = (path) => {

    return new Promise((resolve, reject) => {

        const rows = [];

        fs.createReadStream(path)

            .pipe(csv())

            .on("data", row => {

                rows.push(row);

            })

            .on("end", () => {

                resolve(rows);

            })

            .on("error", err => {

                reject(err);

            });

    });

};