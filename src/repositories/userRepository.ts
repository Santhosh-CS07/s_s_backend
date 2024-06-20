import { Client } from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';

export default class UserRepository {
    private client: Client;
    private table: string;

    constructor(client: Client) {
        this.client = client;
        this.table = 'users';
    }

    async findAll(): Promise<User[]> {
        const query = `SELECT * FROM ${this.table}`;
        const result = await this.client.execute(query);

        return result.rows.map((row) => ({
            id: row.get('id'),
            name: row.get('name'),
            email: row.get('email'),
            password: row.get('password'),
            mobileNumber: row.get('mobileNumber'),
            city: row.get('city'),
            state: row.get('state'),
            verified: row.get('verified'),
            jobTitle: row.get('jobTitle'),
            created_at: row.get('created_at')
        })) as User[];
    }

    async findOne(mobileNumber: string, password: string): Promise<User | null> {
        const query = `SELECT * FROM ${this.table} WHERE mobileNumber = ? AND password = ? ALLOW FILTERING`;
        const params = [mobileNumber, password];
        const result = await this.client.execute(query, params, { prepare: true });

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return {
            id: row.get('id'),
            name: row.get('name'),
            email: row.get('email'),
            password: row.get('password'),
            mobileNumber: row.get('mobileNumber'),
            city: row.get('city'),
            state: row.get('state'),
            verified: row.get('verified'),
            jobTitle: row.get('jobTitle'),
            created_at: row.get('created_at')
        } as User;
    }


    async create(user: User): Promise<void> {
        const id = uuidv4();  // Generate a new UUID for the id
        const createdAt = new Date();

        const query = `INSERT INTO ${this.table} (id, name, email, password, mobileNumber, city, state, verified, jobTitle, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await this.client.execute(query, [id, user.name, user.email, user.password, user.mobileNumber, user.city, user.state, user.verified, user.jobTitle, createdAt], { prepare: true });
    }
}
