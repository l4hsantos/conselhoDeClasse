import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('sistema_escolar.db');

export default db;