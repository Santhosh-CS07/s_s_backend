import { Context } from 'koa'; // Adjust import based on your setup
import DemoUser from '../models/DemoUser';

export const createDemoUsers = async (ctx: Context) => {
  // Extracting form data from request body
  const { fullName, education, mobileNumber, email, course } = ctx.request.body as any;

  try {
    // Check if a user with the given email already exists
    let demoUsers = await DemoUser.findOne({ email });

    if (demoUsers) {
      ctx.status = 200;
      ctx.body = { error: 'User already exists', status: 2, data:[] };
      return;
    }

    // Create a new user object with form data
    demoUsers = new DemoUser({
      fullName, // Mapping form data to user model fields
      education, // Assuming this field is required in your User model
      mobileNumber,
      email,
      course // Assuming this field is added to your User model
    });

    // Save the new user to the database
    await demoUsers.save();

    // Send success response
    ctx.status = 200;
    ctx.body = { message: 'User registered successfully', status: 1 };
  } catch (err: any) {
    console.error(err.message);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};
