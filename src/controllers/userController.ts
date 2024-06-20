import { Context } from 'koa';
import UserRepository from '../repositories/userRepository';
import client from '../models/db';

const userRepository = new UserRepository(client);

export default class UserController {

    public static async getUser(ctx: Context) {
        const { mobileNumber, password } = ctx.query as any; // Extract from query parameters

        if (!mobileNumber || !password) {
            ctx.throw(400, 'Mobile number and password are required');
        }

        try {
            const user = await userRepository.findOne(mobileNumber, password);
            if (!user) {
                ctx.body = { message: 'Sucess', status: 2, data: [] };
                return;
            }
            ctx.body = { message: 'Sucess', status: 1, data: user };
        } catch (error: any) {
            ctx.throw(500, error);
        }
    }



    public static async createUser(ctx: Context) {
        try {
            const { name, email, password, mobileNumber, city, state, verified, jobTitle, created_at } = ctx.request.body as any;
            await userRepository.create({ name, email, password, mobileNumber, city, state, verified, jobTitle, created_at });
            ctx.body = { message: 'Sucess', status: 1 };
        } catch (error: any) {
            ctx.throw(500, error);
        }
    }
}
