/* eslint-disable prettier/prettier */

const factory = require('./src/faker');
module.exports = {
    accounts: factory.generateAccounts(100),
    transactions: factory.generateTransactions(150),
    sessions: factory.generateSessions(100)
};