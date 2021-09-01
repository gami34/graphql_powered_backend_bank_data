/* eslint-disable prettier/prettier */
const faker = require('faker');

const ACCOUNT_TYPES = ['savings', 'cheque'];
const TRANSACTION_TYPES = ['debit', 'credit'];
const BRANCHES = [
    'South Park',
    'East Village',
    'Long Island',
    'So Ho',
    'Ottawa East',
    'Mission Dolores',
];

function generateAccounts(counts) {
    const accounts = [];
    for (let id = 1; id <= counts; id++) {
        accounts.push({
            id,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            country: faker.address.country(),
            type: faker.helpers.randomize(ACCOUNT_TYPES),
            created_at: faker.date.recent(faker.datatype.number(1000)),
            updated_at: faker.date.recent(faker.datatype.number(1000)),
        });
    }
    return accounts;
}

function generateTransactions(counts) {
    const transactions = [];
    for (let id = 1; id <= counts; id++) {
        transactions.push({
            id,
            account_id: faker.datatype.number(100),
            type: faker.helpers.randomize(TRANSACTION_TYPES),
            amount: faker.finance.amount(),
            branch: faker.helpers.randomize(BRANCHES),
        });
    }
    return transactions;
}

function generateSessions(counts) {
    const sessions = [];
    for (let id = 1; id <= counts; id++) {
        sessions.push({
            id,
            lat: faker.address.latitude(),
            long: faker.address.longitude(),
            created_at: faker.date.recent(faker.datatype.number(1000)),
            updated_at: faker.date.recent(faker.datatype.number(1000)),
        });
    }
    return sessions;
}

module.exports = {
    generateAccounts,
    generateTransactions,
    generateSessions,
};
