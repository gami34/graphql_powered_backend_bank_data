/* eslint-disable prettier/prettier */
const faker = require('faker');

function generateAccounts(counts) {
    const accounts = [];
    for (let i = 0; i < counts; i++) {
        const id = i + 1;
        const created_at = faker.date.recent(faker.datatype.number(1000));
        const updated_at = faker.date.recent(faker.datatype.number(1000));
        const country = faker.address.country();
        const type = faker.helpers.randomize(['savings', 'cheque']);
        const first_name = faker.name.firstName();
        const last_name = faker.name.lastName();
        accounts.push({ id, first_name, last_name, country, type, created_at, updated_at });
    }
    return accounts;
}
function generateTransactions(counts) {
    const transactions = [];
    for (let i = 0; i < counts; i++) {
        const id = i + 1;
        const created_at = faker.date.recent(faker.datatype.number(1000));
        const updated_at = faker.date.recent(faker.datatype.number(1000));
        const account_id = faker.datatype.number(100);
        const type = faker.helpers.randomize(['debit', 'credit']);
        const amount = faker.finance.amount();
        const branch = faker.helpers.randomize(['South Park', 'East Village', 'Long Island', 'So Ho', 'Ottawa East', 'Mission Dolores']);
        transactions.push({ id, account_id, type, amount, branch, created_at, updated_at });
    }
    return transactions;
}

function generateSessions(counts) {
    const sessions = [];
    for (let i = 0; i < counts; i++) {
        const id = i + 1;
        const created_at = faker.date.recent(faker.datatype.number(1000));
        const updated_at = faker.date.recent(faker.datatype.number(1000));
        const lat = faker.address.latitude();
        const long = faker.address.longitude();
        sessions.push({ id, lat, long, created_at, updated_at });
    }
    return sessions;
}

module.exports = {
    generateAccounts,
    generateTransactions,
    generateSessions
}