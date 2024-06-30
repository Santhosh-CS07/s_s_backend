// src/controllers/userController.ts

import { Context } from 'koa';
import User from '../models/User';

export const registerUser = async (ctx: Context) => {
  const { name, email, password, mobileNumber, city, state, verified, jobTitle } = ctx.request.body as any;

  try {
    let user = await User.findOne({ email });

    if (user) {
      ctx.status = 400;
      ctx.body = { error: 'User already exists' };
      return;
    }

    user = new User({
      name,
      email,
      password,
      mobileNumber,
      city,
      state,
      verified,
      jobTitle
    });

    await user.save();

    ctx.status = 200;
    ctx.body = { message: 'User registered successfully', status:1 };
  } catch (err:any) {
    console.error(err.message);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

export const getUserByMobileAndPassword = async (ctx: Context) => {
  const { mobileNumber, password } = ctx.request.query as any;

  if (!mobileNumber || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Mobile number and password are required' };
    return;
  }

  try {
    const user = await User.findOne({ mobileNumber, password });

    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }

    ctx.status = 200;
    ctx.body = {data:user, status:1};
  } catch (err: any) {
    console.error(err.message);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

export const getUsers = async (ctx: Context) => {
  try {
    const users = await User.find();
    ctx.status = 200;
    ctx.body = users;
  } catch (err:any) {
    console.error(err.message);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

export const updateUser = async (ctx: Context) => {
  const { id } = ctx.params as any;
  const { name, email, password, mobileNumber, city, state, verified, jobTitle } = ctx.request.body as any;

  try {
    let user = await User.findById(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.city = city || user.city;
    user.state = state || user.state;
    user.verified = verified !== undefined ? verified : user.verified;
    user.jobTitle = jobTitle || user.jobTitle;

    await user.save();

    ctx.status = 200;
    ctx.body = { message: 'User updated successfully' };
  } catch (err:any) {
    console.error(err.message);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

export const deleteUser = async (ctx: Context) => {
  const { id } = ctx.params as any;

  try {
    const user:any = await User.findById(id);

    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }

    await user.remove();

    ctx.status = 200;
    ctx.body = { message: 'User deleted successfully' };
  } catch (err:any) {
    console.error(err.message);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};
