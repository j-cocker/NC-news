const db = require("../../db/connection");
const format = require("pg-format");

const convertTimestampToDate = ({ created_at, ...otherProperties }) => {
    if (!created_at) return { ...otherProperties };
    return { created_at: new Date(created_at), ...otherProperties };
};

const formatTableInsert = (data, keys, tableName) => {
    if (
        !keys.every((key) => {
            console.log(`${key} in data?: ${data[0].hasOwnProperty(key)}`);
            return data[0].hasOwnProperty(key);
        })
    ) {
        console.log("Non matching key in formatter");
        return;
    }

    const keyStr = keys.join(",");

    const dataTimeFix = data.map((obj) => convertTimestampToDate(obj));
    const dataArranged = dataTimeFix.map((obj) => {
        return keys.map((key) => obj[key]);
    });

    const formattedQuery = format(
        `INSERT INTO ${tableName} (${keyStr}) VALUES %L;`,
        dataArranged
    );
    return formattedQuery;
};

module.exports = { formatTableInsert, convertTimestampToDate };
