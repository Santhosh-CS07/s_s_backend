import { Client } from 'cassandra-driver';
import dbConfig from '../config/config';

const client = new Client({
    contactPoints: dbConfig.contactPoints,
    localDataCenter: dbConfig.localDataCenter,
    keyspace: dbConfig.keyspace,
    credentials: dbConfig.credentials
});

client.connect()
    .then(() => console.log('Connected to ScyllaDB'))
    .catch((err) => console.error('Error connecting to ScyllaDB', err));

export default client;
