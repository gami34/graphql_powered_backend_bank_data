/* eslint-disable prettier/prettier */
const faker = require('faker');
const fs = require('fs');

const users = [];
const transactions = [];
for (let i = 0; i < 30; i++) {
    const id = i + 1;
    const created_at = faker.date.recent(faker.datatype.number(1000));
    const country = faker.address.country();
    users.push({ id, ...faker.helpers.userCard(), country, created_at });
    transactions.push({ id, ...faker.helpers.createTransaction() })
};
fs.writeFileSync('database.json', JSON.stringify({ users, transactions }, null, 2));