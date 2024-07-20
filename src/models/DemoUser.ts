import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the DemoUser document
interface IDemoUser extends Document {
  fullName: string;
  education?: string;
  mobileNumber: string;
  email: string;
  course?: string;
  date?: Date;
}

// Define the schema for the DemoUser model
const DemoUserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  education: { type: String },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create the DemoUser model_
const DemoUser = mongoose.model<IDemoUser>('DemoUser', DemoUserSchema);

export default DemoUser;
